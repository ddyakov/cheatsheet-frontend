import { WritableDraft } from 'immer/dist/internal'
import { State } from 'zustand'

export interface StepData {
  title: string
  description: string
  route: string
}

export interface Topic {
  id: number
  title: string
  crossedOut: boolean
  groupId?: number | null
}

export interface StepsStore extends State {
  active: number
  activeToComplete: number
  totalSteps: number
  completed: { [step: number]: boolean }
  canGoToNextStep: boolean
  subject: string
  topics: Topic[]
  isCompleted: (step: number) => boolean
  complete: (step: number) => void
  incomplete: (step: number) => void
  allRequiredStepsCompleted: () => boolean
  getActiveStepData: () => StepData
  addTopic: (title: string) => void
  deleteTopic: (id: number) => void
  toggleCrossOut: (id: number) => void
  getStepData: (step: number) => StepData
  setState: (fn: (draft: WritableDraft<StepsStore>) => void) => void
}
