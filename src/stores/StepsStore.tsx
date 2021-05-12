import produce from 'immer'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { StepData, StepsStore, Topic } from '../types/store'

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
      isCompleted: step => get().completed[step],
      complete: step => {
        const { completed } = get()

        if (completed[step]) return

        completed[step] = true
        const newActiveToComplete =
          Object.keys(completed).find(key => !completed[parseInt(key)]) || '0'

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
      addTopic: title => {
        const { topics } = get()
        const topicsLength = topics.length

        const topic: Topic = {
          id:
            topicsLength > 0
              ? Math.max.apply(
                  Math,
                  topics.map(topic => topic.id)
                ) + 1
              : 1,
          title,
          crossedOut: false,
          groupId: null
        }

        set({ topics: [...topics, topic] })
      },
      deleteTopic: id => set({ topics: [...get().topics.filter(topic => topic.id !== id)] }),
      toggleCrossOut: id => {
        const { topics } = get()
        const topic = topics.find(topic => topic.id === id)
        topic && (topic.crossedOut = !topic.crossedOut)

        set({ topics: [...topics] })
      },
      setState: fn => set(produce(fn, draft => draft))
    }),
    {
      name: 'steps-storage'
    }
  )
)

export default useStepsStore
