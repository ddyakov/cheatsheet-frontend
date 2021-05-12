import { IconButton, InputAdornment, Theme } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { FC, KeyboardEvent, useState } from 'react'

const label = 'Enter a topic...'

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonRoot: {
    color: theme.palette.common.white,
    padding: 7,
    borderRadius: theme.shape.borderRadius / 2,
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    width: 50,
    zIndex: 100,
    marginRight: -14,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }
}))

interface ComponentProps {
  handleOnAddTopicClick: (topicName: string) => void
}

const CheatSheetOutlinedInput: FC<ComponentProps> = ({ handleOnAddTopicClick }) => {
  const classes = useStyles()
  const [inputValue, setInputValue] = useState('')

  const handleOnKeyDown = (event: KeyboardEvent) => event.key === 'Enter' && handleOnClick()

  const handleOnClick = () => {
    if (inputValue.trim()) handleOnAddTopicClick(inputValue.trim())

    setInputValue('')
  }

  return (
    <FormControl variant='outlined' size='small' fullWidth>
      <InputLabel htmlFor='topic-input'>{label}</InputLabel>
      <OutlinedInput
        label={label}
        id='topic-input'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleOnKeyDown}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='add a topic'
              edge='end'
              onClick={handleOnClick}
              className={classes.iconButtonRoot}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default CheatSheetOutlinedInput
