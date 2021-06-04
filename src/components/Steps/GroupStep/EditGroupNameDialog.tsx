import { Button, Dialog, DialogActions, DialogContent, TextField, useMediaQuery } from '@material-ui/core'
import { Theme, useTheme } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import makeStyles from '@material-ui/styles/makeStyles'

interface EditGroupNameDialogProps {
  open: boolean
  onSaveHandler: any
  onCloseHandler: any
  name: string
  setName: (name: string) => void
}

const useStyles = makeStyles<Theme>(({ shape, breakpoints }) => ({
  dialogPaper: {
    borderRadius: +shape.borderRadius / 2,
    [breakpoints.down('sm')]: {
      borderRadius: 0
    }
  }
}))

const EditGroupNameDialog = ({ open, onSaveHandler, onCloseHandler, name, setName }: EditGroupNameDialogProps) => {
  const classes = useStyles()
  const { breakpoints } = useTheme()
  const fullScreen = useMediaQuery(breakpoints.down('sm'))

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
          variant='standard'
          fullWidth={true}
          autoFocus={true}
          value={name}
          autoComplete='off'
          onChange={e => setName(e.target.value)}
          onKeyUp={e => e.key === 'Enter' && onSaveHandler()}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler}>Cancel</Button>
        <Button variant='contained' startIcon={<SaveIcon />} onClick={onSaveHandler}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditGroupNameDialog
