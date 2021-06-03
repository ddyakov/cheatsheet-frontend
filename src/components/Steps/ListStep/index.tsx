import { IconButton, Input, InputAdornment, List, ListItem, ListItemText } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { useCallback, useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import useStepsStore from '../../../stores/StepsStore'
import { TopicStylesProps } from '../../../types/topic'
import DeleteSecondaryAction from '../Lists/SecondaryActions/DeleteSecondaryAction'
import useTopicStyles from '../Lists/styles/topic'

const topicStylesOverrides: TopicStylesProps = {
  list: {
    maxHeight: 515,
    overflowY: 'auto'
  }
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  topicInputContainerAlone: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    transition: 'flex-grow 0.5s ease-in-out'
  },
  topicInputContainer: {
    paddingBottom: spacing(3)
  }
}))

const ListStep = () => {
  const classes = useStyles()
  const [inputValue, setInputValue] = useState('')
  const topicClasses = useTopicStyles(topicStylesOverrides)
  const [topics, addTopic, deleteTopic, setStepState] = useStepsStore(
    state => [state.topics, state.addTopic, state.deleteTopic, state.setStepState],
    shallow
  )
  const hasTopics = useCallback(() => !!topics.length, [topics])

  const handleOnAddTopicClick = () => {
    inputValue && addTopic(inputValue.trim())
    setInputValue('')
  }

  // eslint-disable-next-line
  useEffect(() => setStepState(!!topics.length), [topics])

  return (
    <>
      <div className={hasTopics() ? classes.topicInputContainer : classes.topicInputContainerAlone}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor='topic-input'>Enter a topic...</InputLabel>
          <Input
            id='topic-input'
            value={inputValue}
            autoComplete='off'
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleOnAddTopicClick()}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='add' edge='end' color='secondary' onClick={handleOnAddTopicClick}>
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      {hasTopics() ? (
        <List className={topicClasses.list}>
          {topics.map(({ id, name }) => (
            <ListItem key={id} className={topicClasses.listItem}>
              <ListItemText primary={name} color='primary' />
              <DeleteSecondaryAction deleteListItemHandler={() => deleteTopic(id)} />
            </ListItem>
          ))}
        </List>
      ) : null}
    </>
  )
}

export default ListStep
