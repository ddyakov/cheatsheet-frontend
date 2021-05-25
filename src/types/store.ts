import { WritableDraft } from 'immer/dist/internal'
import { DraggableLocation } from 'react-beautiful-dnd'
import { State } from 'zustand'

export interface StepData {
  title: string
  description: string
  route: string
}

export interface Topic {
  id: string
  name: string
  crossedOut: boolean
  groupId?: string | null
}

export interface TopicGroup {
  id: string
  name: string
  topics: Topic[]
}

export interface StepsStore extends State {
  active: number
  activeToComplete: number
  totalSteps: number
  completed: { [step: number]: boolean }
  canGoToNextStep: boolean
  subject: string
  topics: Topic[]
  tempTopics: Topic[]
  topicGroups: TopicGroup[]
  isCompleted: (step: number) => boolean
  complete: (step: number) => void
  incomplete: (step: number) => void
  allRequiredStepsCompleted: () => boolean
  getActiveStepData: () => StepData
  getStepData: (step: number) => StepData
  addTopic: (name: string) => void
  deleteTopic: (id: string) => void
  toggleCrossOutTopic: (id: string) => void
  groupTopics: (draggedTopicId: string, groupedWithTopicId: string) => void
  moveTopic: (source: DraggableLocation, destination: DraggableLocation) => void
  renameTopicGroup: (id: string, newName: string) => void
  setState: (fn: (draft: WritableDraft<StepsStore>) => void) => void
}
