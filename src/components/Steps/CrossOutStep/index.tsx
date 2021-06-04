import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/styles/makeStyles'
import clsx from 'clsx'
import { useEffect } from 'react'
import shallow from 'zustand/shallow'
import useStepsStore from '../../../stores/steps'
import ListItemGroupedIcon from '../Common/ListItemGroupedIcon'
import useTopicStyles from '../styles/topics'

const useStyles = makeStyles(() => ({
  knowItAllContainer: {
    display: 'flex',
    flexGrow: 1
  },
  knowItAllTypography: {
    alignSelf: 'center',
    textAlign: 'center'
  }
}))

const CrossOutStep = () => {
  const classes = useStyles()
  const topicClasses = useTopicStyles()
  const [topics, allTopicsCrossedOut, toggleCrossOutTopic, setStepState, setAllTopicsCrossedOut] = useStepsStore(
    state => [
      state.topics,
      state.allTopicsCrossedOut,
      state.toggleCrossOutTopic,
      state.setStepState,
      state.setAllTopicsCrossedOut
    ],
    shallow
  )

  useEffect(() => setAllTopicsCrossedOut(topics.every(topic => topic.crossedOut)), [topics, setAllTopicsCrossedOut])

  useEffect(() => setStepState(!allTopicsCrossedOut), [allTopicsCrossedOut, setStepState])

  return (
    <>
      <List className={topicClasses.list}>
        {topics.map(({ id, name, crossedOut, groupId }) => (
          <ListItem
            key={id}
            className={clsx(topicClasses.listItem, topicClasses.listItemHoverPointer)}
            onClick={() => toggleCrossOutTopic(id)}>
            <ListItemGroupedIcon groupId={groupId} />

            <ListItemText
              primary={name}
              color='primary'
              className={clsx(topicClasses.listItemTextFlexNone, { [topicClasses.listItemCrossedOut]: crossedOut })}
            />
          </ListItem>
        ))}
      </List>

      {allTopicsCrossedOut && (
        <div className={classes.knowItAllContainer}>
          <Typography component='span' variant='body1' className={classes.knowItAllTypography}>
            Awesome! You don't need to study if you know everything! :)
          </Typography>
        </div>
      )}
    </>
  )
}

export default CrossOutStep
