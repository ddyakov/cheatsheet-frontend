import { Step, StepButton, Stepper as MuiStepper } from '@material-ui/core'
import { StylesProvider } from '@material-ui/core/styles'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import shallow from 'zustand/shallow'
import useStepsStore from '../../../../stores/StepsStore'
import CheatSheetStepConnector from './CheatSheetStepConnector'
import CheatSheetStepIcon from './CheatSheetStepIcon'
import CheatSheetStepLabel from './CheatSheetStepLabel'
import './Stepper.scss'

const stepsNames: string[] = ['Name', 'List', 'Cross-out', 'Group', 'Editor']

const Stepper = () => {
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
          disabled={!isStepCompleted(index) || !allRequiredStepsCompleted()}
          completed={isStepCompleted(index)}>
          <StepButton
            disableRipple={true}
            onClick={() => setActiveStep(index)}
            component={Link}
            to={getStepData(index).route}>
            <CheatSheetStepLabel StepIconComponent={CheatSheetStepIcon}>{label}</CheatSheetStepLabel>
          </StepButton>
        </Step>
      )),
    // eslint-disable-next-line
    [activeStep, completedSteps, setActiveStep, isStepCompleted, getStepData, allRequiredStepsCompleted]
  )

  return (
    <StylesProvider injectFirst={true}>
      <MuiStepper connector={<CheatSheetStepConnector />} activeStep={activeStep} orientation='vertical'>
        {renderStepsCallback()}
      </MuiStepper>
    </StylesProvider>
  )
}

export default Stepper
