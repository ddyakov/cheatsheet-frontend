import { StepIconProps, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import DoneRoundedIcon from '@material-ui/icons/DoneRounded'
import clsx from 'clsx'
import { FC } from 'react'

const useCustomStepIconStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
)

const CustomStepIcon: FC<StepIconProps> = props => {
  const classes = useCustomStepIconStyles()
  const { active, completed, icon } = props

  const renderStepIconLabel = (): JSX.Element =>
    completed ? <DoneRoundedIcon fontSize='small' /> : <Typography variant='h6'>{icon}</Typography>

  return (
    <div className={clsx(classes.outerContainer, { [classes.completed]: completed })}>
      {active ? (
        <div className={clsx({ [classes.innerContainer]: active })}>{renderStepIconLabel()}</div>
      ) : (
        renderStepIconLabel()
      )}
    </div>
  )
}

export default CustomStepIcon
