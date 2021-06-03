import { IconButton, ListItemSecondaryAction } from '@material-ui/core'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import { MouseEventHandler } from 'react'

interface DeleteSecondaryActionProps {
  deleteListItemHandler: MouseEventHandler<HTMLButtonElement> | undefined
}

const DeleteSecondaryAction = ({ deleteListItemHandler }: DeleteSecondaryActionProps) => {
  return (
    <ListItemSecondaryAction>
      <IconButton onClick={deleteListItemHandler} edge='end' aria-label='delete'>
        <DeleteRoundedIcon color='primary' />
      </IconButton>
    </ListItemSecondaryAction>
  )
}

export default DeleteSecondaryAction
