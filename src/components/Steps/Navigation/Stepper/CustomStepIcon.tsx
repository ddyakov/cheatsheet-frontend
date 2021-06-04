import { StepIconProps, Typography } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import DoneRoundedIcon from '@material-ui/icons/DoneRounded'
import makeStyles from '@material-ui/styles/makeStyles'
import clsx from 'clsx'

const useCustomStepIconStyles = makeStyles<Theme>(({ palette: { secondary, success, common } }) => ({
  outerContainer: {
    zIndex: 1,
    color: secondary.dark,
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px solid ${secondary.dark}`
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    height: '85%',
    borderRadius: '50%',
    backgroundColor: secondary.dark,
    color: common.white
  },
  completed: {
    backgroundColor: success.main,
    color: common.white,
    border: `2px solid ${success.main}`
  }
}))

const CustomStepIcon = ({ active, completed, icon }: StepIconProps) => {
  const classes = useCustomStepIconStyles()

  const renderStepIconLabel = (): JSX.Element =>
    completed && !active ? <DoneRoundedIcon fontSize='small' /> : <Typography variant='h6'>{icon}</Typography>

  return (
    <span className={clsx(classes.outerContainer, { [classes.completed]: completed && !active })}>
      {active ? (
        <span className={clsx({ [classes.innerContainer]: active })}>{renderStepIconLabel()}</span>
      ) : (
        renderStepIconLabel()
      )}
    </span>
  )
}

export default CustomStepIcon
