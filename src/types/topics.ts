export interface TopicStylesProps {
  container?: object
  list?: object
  listEmpty?: object
  listItem?: object
  listItemCrossedOut?: object
  listItemHoverPointer?: object
  listItemHoverShadow?: object
  groupContainer?: object
  groupListContainer?: object
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
