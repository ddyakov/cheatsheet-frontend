import { TextField } from '@material-ui/core'
import { FC } from 'react'

const Name: FC = () => {
  return (
    <TextField
      id='outlined-basic'
      label='What are you studying for?'
      variant='outlined'
      fullWidth
    />
  )
}

export default Name
