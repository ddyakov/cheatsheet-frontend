import { StepIconProps, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import DoneRoundedIcon from '@material-ui/icons/DoneRounded'
import clsx from 'clsx'
import { FC } from 'react'

const useCheatSheetStepIconStyles = makeStyles((theme: Theme) => ({
  outerContainer: {
    zIndex: 1,
    color: theme.palette.secondary.dark,
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px solid ${theme.palette.secondary.dark}`
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    height: '85%',
    borderRadius: '50%',
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white
  },
  completed: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    border: `2px solid ${theme.palette.success.main}`
  }
}))

const CheatSheetStepIcon: FC<StepIconProps> = props => {
  const classes = useCheatSheetStepIconStyles()
  const { active, completed, icon } = props

  const renderStepIconLabel = (): JSX.Element =>
    completed ? <DoneRoundedIcon fontSize='small' /> : <Typography variant='h6'>{icon}</Typography>

  return (
    <span className={clsx(classes.outerContainer, { [classes.completed]: completed })}>
      {active && !completed ? (
        <span className={clsx({ [classes.innerContainer]: active })}>{renderStepIconLabel()}</span>
      ) : (
        renderStepIconLabel()
      )}
    </span>
  )
}

export default CheatSheetStepIcon
