import { Step, StepButton, StepLabel, Stepper as MuiStepper, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import shallow from 'zustand/shallow'
import useStepsStore from '../../../../stores/steps'
import CustomStepConnector from './CustomStepConnector'
import CustomStepIcon from './CustomStepIcon'

const stepsNames: string[] = ['Name', 'List', 'Cross-out', 'Group', 'Editor']

const useStyles = makeStyles<Theme>(({ palette, spacing }) => ({
  stepperRoot: {
    padding: spacing(3)
  },
  stepLabelRoot: {
    padding: 0,

    '& .MuiStepLabel-labelContainer': {
      color: palette.secondary.dark,

      '& .MuiTypography-root.MuiStepLabel-label': {
        fontWeight: 400,

        '&.MuiStepLabel-completed, &.Mui-active': {
          color: palette.common.white
        }
      }
    }
  }
}))

const Stepper = () => {
  const classes = useStyles()
  const [
    activeStep,
    completedSteps,
    setActiveStep,
    isStepCompleted,
    allRequiredStepsCompleted,
    getStepData
  ] = useStepsStore(
    state => [
      state.activeStep,
      state.completedSteps,
      state.setActiveStep,
      state.isStepCompleted,
      state.allRequiredStepsCompleted,
      state.getStepData
    ],
    shallow
  )

  const renderStepsCallback = useCallback(
    () =>
      stepsNames.map((label, index) => (
        <Step
          active={activeStep === index}
          key={index}
          index={index}
          disabled={!isStepCompleted(index) || !allRequiredStepsCompleted()}
          completed={isStepCompleted(index)}>
          <StepButton
            disableRipple={true}
            onClick={() => setActiveStep(index)}
            component={Link}
            to={getStepData(index).route}>
            <StepLabel StepIconComponent={CustomStepIcon} className={classes.stepLabelRoot}>
              {label}
            </StepLabel>
          </StepButton>
        </Step>
      )),
    // eslint-disable-next-line
    [activeStep, completedSteps, setActiveStep, isStepCompleted, getStepData, allRequiredStepsCompleted]
  )

  return (
    <MuiStepper
      connector={<CustomStepConnector />}
      activeStep={activeStep}
      className={classes.stepperRoot}
      orientation='vertical'>
      {renderStepsCallback()}
    </MuiStepper>
  )
}

export default Stepper
