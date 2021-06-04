import produce, { Draft, enableES5, setUseProxies } from 'immer'
import _ from 'lodash'
import pipe from 'ramda/es/pipe'
import { DraggableLocation } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'
import create, { State, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import { ungroupedTopicsDroppableId } from '../constants/steps'
import { StepData, StepsStore } from '../types/stores'
import { Topic, TopicGroup } from '../types/topics'

enableES5()
setUseProxies(false)
// setAutoFreeze(false)

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

// TODO: move functions to a service
const reorderTopics = (topics: Topic[], startIndex: number, endIndex: number): Topic[] => {
  const topicsClone = [...topics]
  const [removedTopic] = topicsClone.splice(startIndex, 1)
  topicsClone.splice(endIndex, 0, removedTopic)

  return topicsClone
}

const moveTopicInternal = (
  sourceTopicGroup: Topic[],
  destinationTopicGroup: Topic[],
  sourceTopicGroupLocation: DraggableLocation,
  destinationTopicGroupLocation: DraggableLocation
) => {
  const sourceTopicGroupClone = [...sourceTopicGroup]
  const destinationTopicGroupClone = [...destinationTopicGroup]
  const [topicToMove] = sourceTopicGroupClone.splice(sourceTopicGroupLocation.index, 1)

  topicToMove.groupId =
    destinationTopicGroupLocation.droppableId === ungroupedTopicsDroppableId
      ? null
      : destinationTopicGroupLocation.droppableId

  destinationTopicGroupClone.splice(destinationTopicGroupLocation.index, 0, topicToMove)

  return {
    sourceTopicGroupResult: sourceTopicGroupClone,
    destinationTopicGroupResult: destinationTopicGroupClone,
    movedTopic: topicToMove
  }
}

const getById = <T extends unknown>(collection: T[], id: string): T => _.find(collection, ['id', id])!

const getTopicById = (topics: Topic[], id: string): Topic => getById<Topic>(topics, id)

const getTopicGroupById = (groups: TopicGroup[], id: string): TopicGroup => getById<TopicGroup>([...groups], id)

const addTopic = (topics: Topic[], topicToAdd: Topic): Topic[] =>
  topics.some(topic => topic.id === topicToAdd.id) ? [...topics] : [...topics, topicToAdd]

const deleteTopic = (topics: Topic[], id: string): Topic[] => _.filter(topics, (topic: Topic) => topic.id !== id)

const deleteTopics = (topics: Topic[], ...toRemoveIds: string[]): Topic[] =>
  _.filter(topics, topic => !toRemoveIds.some(id => id === topic.id))

const deleteTopicFromGroupIfPossible = (topics: Topic[], groups: TopicGroup[], id: string): TopicGroup[] => {
  const topicsClone = [...topics]
  const groupsClone = [...groups]

  const { groupId } = getTopicById(topicsClone, id)

  if (!groupId) return groupsClone

  const topicGroup = getTopicGroupById(groupsClone, groupId)
  topicGroup.topics = deleteTopic(topicGroup.topics, id)

  return filterEmptyTopicGroups(groupsClone)
}

const filterEmptyTopicGroups = (groups: TopicGroup[]) => groups.filter(({ topics }) => topics.length)

const withImmer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
): StateCreator<T> => (set, get, api) => config(fn => set(produce<T>(fn)), get, api)

const withPersist = <T extends State>(config: StateCreator<T>) => persist(config, { name: 'steps-storage' })

const createStore = pipe(withImmer, withPersist, create)

const requiredSteps = [0, 1]

const useStepsStore = createStore<StepsStore>((set, get) => ({
  activeStep: 0,
  totalSteps: stepsData.length,
  completedSteps: [...Array(stepsData.length).fill(false)],
  subject: '',
  topics: [],
  ungroupedTopics: [],
  topicGroups: [],
  allTopicsCrossedOut: false,
  setSubject: subject => {
    get().setStepState(!!subject)
    set(state => void (state.subject = subject))
  },
  // Steps
  getActiveStepData: () => stepsData[get().activeStep],
  getStepData: step => stepsData[step],
  setActiveStep: step => set(state => void (state.activeStep = step)),
  setStepState: (complete, step) => set(state => void (state.completedSteps[step || state.activeStep] = complete)),
  setAllTopicsCrossedOut: allCrossedOut => set(state => void (state.allTopicsCrossedOut = allCrossedOut)),
  isStepCompleted: step => get().completedSteps[step],
  isStepRequired: step => requiredSteps.includes(step),
  allRequiredStepsCompleted: () => requiredSteps.every(step => get().completedSteps[step]),
  // Topics
  addTopic: name => {
    set(state => {
      const topic: Topic = {
        id: uuidv4(),
        name,
        crossedOut: false,
        groupId: null
      }

      state.topics = addTopic(state.topics, topic)
      state.ungroupedTopics = addTopic(state.ungroupedTopics, topic)
    })
  },
  deleteTopic: id =>
    set(state => {
      state.topicGroups = deleteTopicFromGroupIfPossible(state.topics, state.topicGroups, id)

      state.topics = deleteTopic(state.topics, id)
      state.ungroupedTopics = deleteTopic(state.ungroupedTopics, id)
    }),
  toggleCrossOutTopic: id =>
    set(state => {
      const topic: Topic = getTopicById(state.topics, id)
      topic.crossedOut = !topic.crossedOut

      if (topic.crossedOut) {
        state.topicGroups = deleteTopicFromGroupIfPossible(state.topics, state.topicGroups, id)
        topic.groupId = null
      }

      state.ungroupedTopics = topic.crossedOut
        ? deleteTopic(state.ungroupedTopics, id)
        : addTopic(state.ungroupedTopics, topic)
    }),
  groupTopics: (draggedTopicId, groupedWithTopicId) => {
    set(state => {
      const { topics, ungroupedTopics, topicGroups } = state

      const draggedTopic: Topic = getTopicById(topics, draggedTopicId)
      const groupId = uuidv4()

      if (draggedTopic.groupId) {
        const group: TopicGroup = getTopicGroupById(topicGroups, draggedTopic.groupId)
        group.topics = deleteTopic(group.topics, draggedTopic.id)
      }

      const groupedWithTopic: Topic = getTopicById(topics, groupedWithTopicId)

      draggedTopic.groupId = groupId
      groupedWithTopic.groupId = groupId

      const newTopicGroup: TopicGroup = {
        id: groupId,
        name: `${draggedTopic.name} & ${groupedWithTopic.name}`,
        topics: [draggedTopic, groupedWithTopic]
      }

      state.ungroupedTopics = deleteTopics(ungroupedTopics, draggedTopicId, groupedWithTopicId)
      state.topicGroups = filterEmptyTopicGroups([...topicGroups, newTopicGroup])
    })
  },
  moveTopic: (sourceTopicGroupLocation, destinationTopicGroupLocation) => {
    set(state => {
      const { topics, ungroupedTopics, topicGroups } = state

      const sourceTopicGroupId = sourceTopicGroupLocation.droppableId
      const destinationTopicGroupId = destinationTopicGroupLocation.droppableId

      const ungroupedTopicsGroup: TopicGroup = {
        id: ungroupedTopicsDroppableId,
        name: '',
        topics: ungroupedTopics
      }
      const tempTopicGroups: TopicGroup[] = [ungroupedTopicsGroup, ...topicGroups]

      if (sourceTopicGroupId === destinationTopicGroupId) {
        const topicGroup: TopicGroup = getTopicGroupById(tempTopicGroups, sourceTopicGroupId)
        topicGroup.topics = reorderTopics(
          topicGroup.topics,
          sourceTopicGroupLocation.index,
          destinationTopicGroupLocation.index
        )

        if (sourceTopicGroupId === ungroupedTopicsDroppableId) state.ungroupedTopics = topicGroup.topics
        else state.topicGroups = _.slice(tempTopicGroups, 1)

        return
      }

      const sourceTopicGroup: TopicGroup = getTopicGroupById(tempTopicGroups, sourceTopicGroupId)
      const destinationTopicGroup: TopicGroup = getTopicGroupById(tempTopicGroups, destinationTopicGroupId)

      const { sourceTopicGroupResult, destinationTopicGroupResult, movedTopic } = moveTopicInternal(
        sourceTopicGroup.topics,
        destinationTopicGroup.topics,
        sourceTopicGroupLocation,
        destinationTopicGroupLocation
      )

      sourceTopicGroup.topics = sourceTopicGroupResult
      destinationTopicGroup.topics = destinationTopicGroupResult

      const originalTopic = getTopicById(topics, movedTopic.id)
      originalTopic.groupId = movedTopic.groupId

      const ungroupedTopicsTemp =
        sourceTopicGroupId === ungroupedTopicsDroppableId
          ? sourceTopicGroup.topics
          : destinationTopicGroupId === ungroupedTopicsDroppableId
          ? destinationTopicGroup.topics
          : [...ungroupedTopics]

      state.ungroupedTopics = ungroupedTopicsTemp
      state.topicGroups = filterEmptyTopicGroups(_.slice(tempTopicGroups, 1))
    })
  },
  renameTopicGroup: (id, newName) => set(state => void (getTopicGroupById(state.topicGroups, id).name = newName))
}))

export default useStepsStore
