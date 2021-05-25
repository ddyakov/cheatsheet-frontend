import {
  Grid,
  IconButton,
  List as MuiList,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import clsx from 'clsx'
import { FC, useEffect } from 'react'
import shallow from 'zustand/shallow'
import useStepsStore from '../../../stores/StepsStore'
import { Topic } from '../../../types/store'
import CheatSheetOutlinedInput from '../../Common/CheatSheetOutlinedInput'

const useStyles = makeStyles((theme: Theme) => ({
  topicsContainer: {
    flexGrow: 1,
    maxHeight: 425
  },
  topics: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius / 2,
    padding: theme.spacing(2)
  },
  topicsEmpty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.light
  },
  topic: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius / 2,
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2)
    },
    wordBreak: 'break-all'
  }
}))

const ListStep: FC = () => {
  const classes = useStyles()
  const [active, topics, addTopic, deleteTopic, incomplete, setState] = useStepsStore(
    state => [state.active, state.topics, state.addTopic, state.deleteTopic, state.incomplete, state.setState],
    shallow
  )

  useEffect(() => {
    const hasTopics = topics.length > 0
    setState(state => (state.canGoToNextStep = hasTopics))
    !hasTopics && incomplete(active)
  }, [active, topics, incomplete, setState])

  const handleOnAddTopicClick = (title: string) => addTopic(title)

  return (
    <Grid container spacing={4} direction='column'>
      <Grid item>
        <Typography variant='h5' color='primary'>
          My Topics
        </Typography>
      </Grid>
      <Grid item>
        <CheatSheetOutlinedInput handleOnAddTopicClick={handleOnAddTopicClick} />
      </Grid>
      <Grid item container className={classes.topicsContainer}>
        {topics.length ? (
          <MuiList aria-label='topics' className={classes.topics}>
            {topics.map((topic: Topic) => {
              const { id, name } = topic

              return (
                <ListItem key={id} className={classes.topic}>
                  <ListItemText primary={name} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => deleteTopic(id)} edge='end' aria-label='delete topic'>
                      <DeleteRoundedIcon color='primary' />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </MuiList>
        ) : (
          <div className={clsx(classes.topics, classes.topicsEmpty)}>You do not have any topics yet</div>
        )}
      </Grid>
    </Grid>
  )
}

export default ListStep