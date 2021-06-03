import { DraggableLocation } from 'react-beautiful-dnd'
import { State } from 'zustand'
import { Topic, TopicGroup } from './topic'

export interface StepData {
  title: string
  description: string
  route: string
}

export interface StepsStore extends State {
  activeStep: number
  totalSteps: number
  completedSteps: boolean[]
  subject: string
  topics: Topic[]
  ungroupedTopics: Topic[]
  topicGroups: TopicGroup[]
  setSubject: (subject: string) => void
  // Steps
  getActiveStepData: () => StepData
  getStepData: (step: number) => StepData
  setActiveStep: (step: number) => void
  setStepState: (complete: boolean, step?: number) => void
  isStepCompleted: (step: number) => boolean
  isStepRequired: (step: number) => boolean
  allRequiredStepsCompleted: () => boolean
  // Topics
  addTopic: (name: string) => void
  deleteTopic: (id: string) => void
  toggleCrossOutTopic: (id: string) => void
  groupTopics: (draggedTopicId: string, groupedWithTopicId: string) => void
  moveTopic: (sourceTopicGroupLocation: DraggableLocation, destinationTopicGroupLocation: DraggableLocation) => void
  renameTopicGroup: (id: string, newName: string) => void
}
