import { Grid, List as MuiList, ListItem, ListItemText, Typography } from '@material-ui/core'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { CSSProperties, FC } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import shallow from 'zustand/shallow'
import useStepsStore from '../../../stores/StepsStore'
import { Topic } from '../../../types/store'

const useStyles = makeStyles((theme: Theme) => ({
  topicsContainer: {
    flexGrow: 1,
    maxHeight: 552
  }
}))

const Group: FC = () => {
  const classes = useStyles()
  const theme = useTheme()
  const { topics, setState } = useStepsStore(
    state => ({
      topics: state.topics,
      setState: state.setState
    }),
    shallow
  )

  const getTopicStyle = (draggableStyle: any): CSSProperties => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius / 2,
    marginBottom: theme.spacing(2),
    wordBreak: 'break-all',
    ...draggableStyle
  })

  const getTopicsListStyle = (): CSSProperties => ({
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius / 2,
    padding: theme.spacing(2)
  })

  const reorder = (topics: Topic[], startIndex: number, endIndex: number): Topic[] => {
    const result = Array.from(topics)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (dropResult: DropResult) => {
    if (!dropResult.destination) return

    console.log(dropResult)

    const reorderedTopics: Topic[] = reorder(
      topics.filter(topic => !topic.crossedOut),
      dropResult.source.index,
      dropResult.destination.index
    )

    setState(
      state =>
        (state.topics = [...state.topics.filter(topic => topic.crossedOut), ...reorderedTopics])
    )
  }

  return (
    <Grid container spacing={4} direction='column'>
      <Grid item>
        <Typography variant='h5' color='primary'>
          My Topics
        </Typography>
      </Grid>
      <Grid item container className={classes.topicsContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='group-topics-droppable' isCombineEnabled>
            {(provided, snapshot) => (
              <MuiList
                aria-label='topics list'
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={getTopicsListStyle()}>
                {[...topics]
                  .filter(topic => !topic.crossedOut)
                  .map((topic, index) => {
                    return (
                      <Draggable key={topic.id} draggableId={topic.id.toString()} index={index}>
                        {(provided, snapshot) => (
                          <ListItem
                            key={topic.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getTopicStyle(provided.draggableProps.style)}>
                            <ListItemText primary={topic.title} />
                          </ListItem>
                        )}
                      </Draggable>
                    )
                  })}
                {provided.placeholder}
              </MuiList>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </Grid>
  )
}

export default Group
