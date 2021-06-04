import {
  Collapse,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { Theme } from '@material-ui/core/styles'
import { Add } from '@material-ui/icons'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import makeStyles from '@material-ui/styles/makeStyles'
import { useCallback, useEffect, useState } from 'react'
import { TransitionGroup } from 'react-transition-group'
import shallow from 'zustand/shallow'
import useStepsStore from '../../../stores/steps'
import { TopicStylesProps } from '../../../types/topics'
import ListItemGroupedIcon from '../Common/ListItemGroupedIcon'
import useTopicStyles from '../styles/topics'

const topicStylesOverrides: TopicStylesProps = {
  list: {
    maxHeight: 515,
    overflowY: 'auto'
  }
}

const useStyles = makeStyles<Theme>(({ spacing }) => ({
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

  useEffect(() => setStepState(!!topics.length), [topics, setStepState])

  return (
    <>
      <div className={hasTopics() ? classes.topicInputContainer : classes.topicInputContainerAlone}>
        <FormControl fullWidth={true} variant='standard'>
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
                  <Add />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      {hasTopics() && (
        <List className={topicClasses.list}>
          <TransitionGroup>
            {topics.map(({ id, name, groupId }) => (
              <Collapse key={id} in={true}>
                <ListItem className={topicClasses.listItem}>
                  <ListItemGroupedIcon groupId={groupId} />

                  <ListItemText primary={name} color='primary' />

                  <ListItemSecondaryAction>
                    <IconButton onClick={() => deleteTopic(id)} edge='end' aria-label='delete'>
                      <DeleteRoundedIcon color='primary' />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      )}
    </>
  )
}

export default ListStep
