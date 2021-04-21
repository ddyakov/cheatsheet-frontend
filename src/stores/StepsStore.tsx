import produce from 'immer'
import create, { GetState, SetState, State } from 'zustand'
import { persist } from 'zustand/middleware'

interface StepData {
  title: string
  description: string
  route: string
}

interface StepsStore extends State {
  activeStep: number
  subject: string
  stepsCount: number
  getActiveStepData(): StepData
  getStepData(step: number): StepData
  set(fn: any): void
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
    (set: SetState<StepsStore>, get: GetState<StepsStore>) => ({
      activeStep: 0,
      subject: '',
      stepsCount: stepsData.length,
      getActiveStepData: () => stepsData[get().activeStep],
      getStepData: step => stepsData[step],
      set: fn => set(produce(fn))
    }),
    {
      name: 'steps-storage'
    }
  )
)

export default useStepsStore
