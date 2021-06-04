import { experimentalStyled as styled } from '@material-ui/core'
import StepConnector, { stepConnectorClasses } from '@material-ui/core/StepConnector'

const CustomStepConnector = styled(StepConnector)(({ theme: { palette } }) => ({
  [`&.${stepConnectorClasses.vertical}`]: {
    marginLeft: 21
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    borderColor: palette.success.main
  },
  [`&.${stepConnectorClasses.disabled}.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: palette.success.main
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: palette.secondary.dark
  },
  [`& .${stepConnectorClasses.lineVertical}`]: {
    minHeight: 50,
    borderLeftWidth: 2
  }
}))

export default CustomStepConnector
