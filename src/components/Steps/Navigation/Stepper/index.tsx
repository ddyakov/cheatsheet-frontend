import { Step, StepButton, Stepper as MuiStepper } from '@material-ui/core'
import { makeStyles, StylesProvider } from '@material-ui/core/styles'
import { FC } from 'react'
import useStepsStore from '../../../../stores/StepsStore'
import CustomStepConnector from './CustomStepConnector'
import CustomStepIcon from './CustomStepIcon'
import CustomStepLabel from './CustomStepLabel'
import './Stepper.scss'

const stepsNames = ['Name', 'List', 'Cross-out', 'Group', 'Editor']

const useStyles = makeStyles({
  stepper: {
    '&.MuiPaper-root': {
      backgroundColor: 'inherit'
    }
  }
})

const Stepper: FC = () => {
  const classes = useStyles()
  const activeStep = useStepsStore(state => state.activeStep)

  const renderSteps = (): JSX.Element[] =>
    stepsNames.map((label, index) => {
      return (
        <Step key={index}>
          <StepButton disableRipple={true}>
            <CustomStepLabel StepIconComponent={CustomStepIcon}>{label}</CustomStepLabel>
          </StepButton>
        </Step>
      )
    })

  return (
    <StylesProvider injectFirst>
      <MuiStepper
        connector={<CustomStepConnector />}
        className={classes.stepper}
        activeStep={activeStep}
        orientation='vertical'>
        {renderSteps()}
      </MuiStepper>
    </StylesProvider>
  )
}

export default Stepper
