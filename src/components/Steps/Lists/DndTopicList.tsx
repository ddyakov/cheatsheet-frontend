import { List, ListItem, ListItemText, makeStyles, Theme } from '@material-ui/core'
import { FC } from 'react'
import { Draggable, DraggableProvided, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { Topic } from '../../../types/store'

interface ComponentProps {
  topics: Topic[]
  droppableId: string
  isCombineEnabled?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  topicListItem: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius / 2,
    wordBreak: 'break-all',
    transition: 'all 0.1s ease-in-out',

    '&:not(:last-child)': {
      marginBottom: theme.spacing(2)
    },
    '&:hover': {
      boxShadow: theme.shadows[3],
      transform: 'scale(1.02, 1.02)'
    }
  }
}))

const DndTopicList: FC<ComponentProps> = ({ topics, droppableId, isCombineEnabled }) => {
  const classes = useStyles()

  const renderTopicListItem = (id: string, name: string, index: number): JSX.Element => (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided: DraggableProvided) => (
        <ListItem
          key={id}
          className={classes.topicListItem}
          ref={provided.innerRef}
          style={provided.draggableProps.style}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <ListItemText primary={name} />
        </ListItem>
      )}
    </Draggable>
  )

  return (
    <Droppable droppableId={droppableId} isCombineEnabled={isCombineEnabled}>
      {(provided: DroppableProvided) => (
        <List aria-label='droppable-topic-list' ref={provided.innerRef} {...provided.droppableProps}>
          {topics.map(({ id, name }, index: number) => renderTopicListItem(id, name, index))}

          {provided.placeholder}
        </List>
      )}
    </Droppable>
  )
}

DndTopicList.defaultProps = {
  topics: [],
  isCombineEnabled: false
}

export default DndTopicList
