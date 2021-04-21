import StepConnector from '@material-ui/core/StepConnector'
import { withStyles } from '@material-ui/core/styles'

const CustomStepConnector = withStyles(({ palette }) => ({
  line: {
    borderColor: palette.secondary.dark
  },
  vertical: {
    padding: 0,
    marginLeft: 21
  },
  lineVertical: {
    minHeight: 50,
    borderLeftWidth: 2
  },
  completed: {
    '& $line': {
      borderColor: palette.success.main
    }
  },
  active: {
    '& $line': {
      borderColor: palette.success.main
    }
  }
}))(StepConnector)

export default CustomStepConnector
