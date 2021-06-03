import { List, ListItem, ListItemText } from '@material-ui/core'
import clsx from 'clsx'
import { useEffect } from 'react'
import shallow from 'zustand/shallow'
import useStepsStore from '../../../stores/StepsStore'
import useTopicStyles from '../Lists/styles/topic'

const CrossOutStep = () => {
  const topicClasses = useTopicStyles()
  const [topics, toggleCrossOutTopic, setStepState] = useStepsStore(
    state => [state.topics, state.toggleCrossOutTopic, state.setStepState],
    shallow
  )

  useEffect(() => setStepState(true), [setStepState])

  return (
    <List className={topicClasses.list}>
      {topics.map(({ id, name, crossedOut }) => (
        <ListItem
          key={id}
          className={clsx(topicClasses.listItem, topicClasses.listItemHoverPointer)}
          onClick={() => toggleCrossOutTopic(id)}>
          <ListItemText
            primary={name}
            color='primary'
            className={clsx({ [topicClasses.listItemCrossedOut]: crossedOut })}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default CrossOutStep
