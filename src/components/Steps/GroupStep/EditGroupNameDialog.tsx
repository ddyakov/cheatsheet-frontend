import { Button, Dialog, DialogActions, DialogContent, TextField, useMediaQuery } from '@material-ui/core'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'

interface EditGroupNameDialogProps {
  open: boolean
  onSaveHandler: any
  onCloseHandler: any
  name: string
  setName: (name: string) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  dialogPaper: {
    borderRadius: theme.shape.borderRadius / 2,
    [theme.breakpoints.only('xs')]: {
      borderRadius: 0
    }
  }
}))

const EditGroupNameDialog = ({ open, onSaveHandler, onCloseHandler, name, setName }: EditGroupNameDialogProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Dialog
      open={open}
      maxWidth='sm'
      fullWidth={true}
      fullScreen={fullScreen}
      onClose={onCloseHandler}
      aria-labelledby='edit-group-name-dialog'
      PaperProps={{ className: classes.dialogPaper }}>
      <DialogContent>
        <TextField
          id='group-name'
          label='What is the new name?'
          fullWidth={true}
          autoFocus={true}
          value={name}
          autoComplete='off'
          onChange={e => setName(e.target.value)}
          onKeyUp={e => e.key === 'Enter' && onSaveHandler()}
        />
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={onCloseHandler}>
          Cancel
        </Button>
        <Button variant='contained' color='primary' startIcon={<SaveIcon />} onClick={onSaveHandler}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditGroupNameDialog
