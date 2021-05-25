import produce from 'immer'
import _ from 'lodash'
import { DraggableLocation } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { ungroupedTopicsDroppableId } from '../constants/steps'
import { StepData, StepsStore, Topic, TopicGroup } from '../types/store'

const baseRoute = '/steps'
const stepsData: StepData[] = [
  {
    title: 'Name',
    description: 'Enter a name for your cheat sheet.',
    route: `${baseRoute}/name`
  },
  {
    title: 'List',
    description: 'Create a list with all the topics you will need.',
    route: `${baseRoute}/list`
  },
  {
    title: 'Cross-out',
    description: 'Cross-out topics you think you already know.',
    route: `${baseRoute}/cross-out`
  },
  {
    title: 'Group',
    description: 'Group topics that have something in common.',
    route: `${baseRoute}/group`
  },
  {
    title: 'Editor',
    description: 'Create your cheat sheet the way you want!',
    route: `${baseRoute}/editor`
  }
]

const reorderTopics = (topics: Topic[], startIndex: number, endIndex: number): Topic[] => {
  const topicsClone = [...topics]
  const [removedTopic] = topicsClone.splice(startIndex, 1)
  topicsClone.splice(endIndex, 0, removedTopic)

  return topicsClone
}

const moveTopic = (
  sourceTopicGroup: Topic[],
  destinationTopicGroup: Topic[],
  source: DraggableLocation,
  destination: DraggableLocation
) => {
  const sourceTopicGroupClone = [...sourceTopicGroup]
  const destinationTopicGroupClone = [...destinationTopicGroup]
  const [topicToMove] = sourceTopicGroupClone.splice(source.index, 1)

  topicToMove.groupId = destination.droppableId === ungroupedTopicsDroppableId ? null : destination.droppableId

  destinationTopicGroupClone.splice(destination.index, 0, topicToMove)

  return {
    [source.droppableId]: sourceTopicGroupClone,
    [destination.droppableId]: destinationTopicGroupClone
  }
}

const getById = <T extends unknown>(collection: T[], id: string): T => _.find(collection, ['id', id])!

const getTopicById = (topics: Topic[], id: string): Topic => getById<Topic>([...topics], id)

const getTopicGroupById = (groups: TopicGroup[], id: string): TopicGroup => getById<TopicGroup>([...groups], id)

const addTopic = (topics: Topic[], topic: Topic): Topic[] => [...topics, topic]

const deleteTopic = (topics: Topic[], id: string): Topic[] => _.filter(topics, (topic: Topic) => topic.id !== id)

const deleteTopics = (topics: Topic[], ...topicsToRemove: Topic[]): Topic[] => _.difference(topics, topicsToRemove)

const requiredSteps: number[] = [0, 1]

const useStepsStore = create<StepsStore>(
  persist<StepsStore>(
    (set, get) => ({
      active: 0,
      activeToComplete: 0,
      totalSteps: stepsData.length,
      completed: { ...[...new Array(stepsData.length).fill(false)] },
      canGoToNextStep: true,
      subject: '',
      topics: [],
      tempTopics: [],
      topicGroups: [],
      isCompleted: step => get().completed[step],
      complete: step => {
        const { completed } = get()

        if (completed[step]) return

        completed[step] = true
        const newActiveToComplete = Object.keys(completed).find(key => !completed[parseInt(key)]) || '0'

        set({
          activeToComplete: parseInt(newActiveToComplete),
          completed: { ...completed }
        })
      },
      incomplete: step => {
        const { completed } = get()

        if (!completed[step]) return

        completed[step] = false
        set({ activeToComplete: step, completed: { ...completed } })
      },
      allRequiredStepsCompleted: () => requiredSteps.every(step => get().completed[step]),
      getActiveStepData: () => stepsData[get().active],
      getStepData: step => stepsData[step],
      addTopic: name => {
        const topic: Topic = {
          id: uuidv4(),
          name,
          crossedOut: false,
          groupId: null
        }

        set(state => ({
          topics: addTopic(state.topics, topic),
          tempTopics: addTopic(state.tempTopics, topic)
        }))
      },
      deleteTopic: id => {
        // TODO: remove topic from group if it is in one
        set(state => ({
          topics: deleteTopic(state.topics, id),
          tempTopics: deleteTopic(state.tempTopics, id)
        }))
      },
      toggleCrossOutTopic: id => {
        // TODO: remove topic from group if it is in one
        const { topics, tempTopics } = get()

        const topic: Topic = getTopicById(topics, id)
        topic.crossedOut = !topic.crossedOut

        const tempTopicsClone = topic.crossedOut ? deleteTopic([...tempTopics], id) : addTopic([...tempTopics], topic)

        set({ topics: [...topics], tempTopics: tempTopicsClone })
      },
      groupTopics: (draggedTopicId, groupedWithTopicId) => {
        const { topics, tempTopics, topicGroups } = get()

        const draggedTopic: Topic = getTopicById(topics, draggedTopicId)

        if (draggedTopic.groupId) {
          const group: TopicGroup = getTopicGroupById(topicGroups, draggedTopic.groupId)
          group.topics = deleteTopic(group.topics, draggedTopic.id)
        }

        const groupedWithTopic: Topic = getTopicById(topics, groupedWithTopicId)

        const groupId = uuidv4()
        draggedTopic.groupId = groupId
        groupedWithTopic.groupId = groupId

        const newTopicGroup: TopicGroup = {
          id: groupId,
          name: `Group ${topicGroups.length + 1}`,
          topics: [draggedTopic, groupedWithTopic]
        }

        set({
          topics: [...topics],
          tempTopics: deleteTopics(tempTopics, draggedTopic, groupedWithTopic),
          topicGroups: [newTopicGroup, ...topicGroups].filter(({ topics }) => topics.length)
        })
      },
      moveTopic: (source, destination) => {
        const { tempTopics, topicGroups } = get()

        const sourceId = source.droppableId
        const destinationId = destination.droppableId

        const tempTopicGroup: TopicGroup = {
          id: ungroupedTopicsDroppableId,
          name: '',
          topics: tempTopics
        }
        const tempTopicGroups: TopicGroup[] = [tempTopicGroup, ...topicGroups]

        if (sourceId === destinationId) {
          const topicGroup: TopicGroup = getTopicGroupById(tempTopicGroups, sourceId)
          topicGroup.topics = reorderTopics(topicGroup.topics, source.index, destination.index)

          if (sourceId === ungroupedTopicsDroppableId) set({ tempTopics: topicGroup.topics })
          else set({ topicGroups: _.slice(tempTopicGroups, 1) })
        } else {
          const sourceTopicGroup: TopicGroup = getTopicGroupById(tempTopicGroups, sourceId)
          const destinationTopicGroup: TopicGroup = getTopicGroupById(tempTopicGroups, destinationId)

          const result = moveTopic(sourceTopicGroup.topics, destinationTopicGroup.topics, source, destination)

          sourceTopicGroup.topics = result[sourceId]
          destinationTopicGroup.topics = result[destinationId]

          set({
            tempTopics:
              sourceId === ungroupedTopicsDroppableId
                ? sourceTopicGroup.topics
                : destinationId === ungroupedTopicsDroppableId
                ? destinationTopicGroup.topics
                : [...tempTopics],
            topicGroups: _.slice(tempTopicGroups, 1).filter(({ topics }) => topics.length)
          })
        }
      },
      renameTopicGroup: (id, newName) => {
        const { topicGroups } = get()

        const group: TopicGroup = getTopicGroupById(topicGroups, id)
        group.name = newName

        set({ topicGroups: [...topicGroups] })
      },
      setState: fn => set(produce(fn, draft => draft))
    }),
    {
      name: 'steps-storage'
    }
  )
)

export default useStepsStore
