import { createStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const CheatSheetTextField = withStyles(({ palette: { secondary: { main, light } } }) =>
  createStyles({
    root: {
      '& label': {
        color: light
      },
      '& label.Mui-focused': {
        color: main
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: light
        },
        '&:hover fieldset': {
          borderColor: main
        },
        '&.Mui-focused fieldset': {
          borderColor: main
        }
      },
      '.MuiInputBase-input': {
        color: main
      }
    }
  })
)(TextField)

export default CheatSheetTextField
