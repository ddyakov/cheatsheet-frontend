import { Grid, List as MuiList, ListItem, ListItemText, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import { FC } from 'react'
import shallow from 'zustand/shallow'
import useStepsStore from '../../../stores/StepsStore'
import { Topic } from '../../../types/store'

const useStyles = makeStyles((theme: Theme) => ({
  topicsContainer: {
    flexGrow: 1,
    maxHeight: 552
  },
  topics: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius / 2,
    padding: theme.spacing(2)
  },
  topic: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius / 2,
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2)
    },
    wordBreak: 'break-all',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  topicCrossedOut: {
    textDecoration: 'line-through'
  }
}))

const CrossOutStep: FC = () => {
  const classes = useStyles()
  const [topics, toggleCrossOutTopic] = useStepsStore(state => [state.topics, state.toggleCrossOutTopic], shallow)

  return (
    <Grid container spacing={4} direction='column'>
      <Grid item>
        <Typography variant='h5' color='primary'>
          My Topics
        </Typography>
      </Grid>
      <Grid item container className={classes.topicsContainer}>
        <MuiList aria-label='topics' className={classes.topics}>
          {topics.map((topic: Topic) => {
            const { id, name, crossedOut } = topic

            return (
              <ListItem key={id} className={classes.topic} onClick={() => toggleCrossOutTopic(id)}>
                <ListItemText primary={name} className={clsx({ [classes.topicCrossedOut]: crossedOut })} />
              </ListItem>
            )
          })}
        </MuiList>
      </Grid>
    </Grid>
  )
}

export default CrossOutStep
