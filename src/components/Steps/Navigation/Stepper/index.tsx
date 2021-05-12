import { Step, StepButton, Stepper as MuiStepper } from '@material-ui/core'
import { StylesProvider } from '@material-ui/core/styles'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import useStepsStore from '../../../../stores/StepsStore'
import CheatSheetStepConnector from './CheatSheetStepConnector'
import CheatSheetStepIcon from './CheatSheetStepIcon'
import CheatSheetStepLabel from './CheatSheetStepLabel'
import './Stepper.scss'

const stepsNames: string[] = ['Name', 'List', 'Cross-out', 'Group', 'Editor']

const Stepper: FC = () => {
  const {
    active,
    activeToComplete,
    isCompleted,
    allRequiredStepsCompleted,
    getStepData,
    setState
  } = useStepsStore(state => ({
    active: state.active,
    activeToComplete: state.activeToComplete,
    isCompleted: state.isCompleted,
    allRequiredStepsCompleted: state.allRequiredStepsCompleted,
    getStepData: state.getStepData,
    setState: state.setState
  }))

  const handleOnStepButtonClick = (step: number) =>
    setState(state => {
      state.active = step
    })

  const renderSteps = (): JSX.Element[] =>
    stepsNames.map((label, index) => {
      const isActive = activeToComplete === index

      return (
        <Step
          active={isActive}
          key={index}
          disabled={(!isCompleted(index) && !isActive) || !allRequiredStepsCompleted()}
          completed={isCompleted(index)}>
          <StepButton
            disableRipple={true}
            onClick={() => handleOnStepButtonClick(index)}
            component={Link}
            to={getStepData(index).route}>
            <CheatSheetStepLabel StepIconComponent={CheatSheetStepIcon}>
              {label}
            </CheatSheetStepLabel>
          </StepButton>
        </Step>
      )
    })

  return (
    <StylesProvider injectFirst>
      <MuiStepper
        connector={<CheatSheetStepConnector />}
        activeStep={active}
        orientation='vertical'>
        {renderSteps()}
      </MuiStepper>
    </StylesProvider>
  )
}

export default Stepper
