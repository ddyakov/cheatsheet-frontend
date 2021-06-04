import { List, ListItem, ListItemIcon, ListItemText, useTheme } from '@material-ui/core'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import clsx from 'clsx'
import { CSSProperties } from 'react'
import {
  Draggable,
  DraggableProvided,
  DraggingStyle,
  Droppable,
  DroppableProvided,
  NotDraggingStyle
} from 'react-beautiful-dnd'
import { Topic } from '../../../types/topics'
import useTopicStyles from '../styles/topics'

interface DndTopicListProps {
  topics: Topic[]
  listStyle?: CSSProperties
  droppableId: string
  isCombineEnabled?: boolean
}

const DndTopicList = ({ topics, listStyle, droppableId, isCombineEnabled = false }: DndTopicListProps) => {
  const topicClasses = useTopicStyles()
  const { spacing } = useTheme()

  const getListItemStyles = (draggableStyle: DraggingStyle | NotDraggingStyle | undefined): CSSProperties => ({
    userSelect: 'none',
    marginBottom: spacing(2),
    ...draggableStyle
  })

  return (
    <Droppable droppableId={droppableId} isCombineEnabled={isCombineEnabled}>
      {(provided: DroppableProvided) => (
        <List ref={provided.innerRef} aria-label='List' style={listStyle}>
          {topics.map(({ id, name }, index) => (
            <Draggable key={id} draggableId={id} index={index}>
              {(provided: DraggableProvided) => (
                <ListItem
                  key={id}
                  className={clsx(topicClasses.listItem, topicClasses.listItemHoverShadow)}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getListItemStyles(provided.draggableProps.style)}>
                  <ListItemIcon>
                    <DragIndicatorIcon color='primary' fontSize='small' />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  )
}

export default DndTopicList
