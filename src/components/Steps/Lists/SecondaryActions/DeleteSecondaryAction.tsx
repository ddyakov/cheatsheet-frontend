import { IconButton, ListItemSecondaryAction } from '@material-ui/core'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import { FC, MouseEventHandler } from 'react'

interface ComponentProps {
  ariaLabel: string
  deleteListItemHandler: MouseEventHandler<HTMLButtonElement> | undefined
}

const DeleteSecondaryAction: FC<ComponentProps> = ({ ariaLabel, deleteListItemHandler }) => {
  return (
    <ListItemSecondaryAction>
      <IconButton onClick={deleteListItemHandler} edge='end' aria-label={ariaLabel}>
        <DeleteRoundedIcon color='primary' />
      </IconButton>
    </ListItemSecondaryAction>
  )
}

export default DeleteSecondaryAction
