import produce from 'immer'
import { WritableDraft } from 'immer/dist/internal'
import create, { State } from 'zustand'
import { persist } from 'zustand/middleware'

interface StepData {
  title: string
  description: string
  route: string
}

export interface StepsStore extends State {
  active: number
  activeToComplete: number
  subject: string
  totalSteps: number
  completed: { [step: number]: boolean }
  isCompleted: (step: number) => boolean
  complete: (step: number) => void
  getActiveStepData: () => StepData
  getStepData: (step: number) => StepData
  setState: (fn: (draft: WritableDraft<StepsStore>) => void) => void
}

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

const useStepsStore = create<StepsStore>(
  persist<StepsStore>(
    (set, get) => ({
      active: 0,
      activeToComplete: 0,
      subject: '',
      totalSteps: stepsData.length,
      completed: {},
      isCompleted: step => get().completed[step],
      complete: step => (get().completed[step] = true),
      getActiveStepData: () => stepsData[get().active],
      getStepData: step => stepsData[step],
      setState: fn => set(produce(fn, draft => draft))
    }),
    {
      name: 'steps-storage'
    }
  )
)

export default useStepsStore
