import { Button, Grid, Link, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { FC, useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import shallow from 'zustand/shallow'
import useStepsStore from '../../../../stores/StepsStore'

const useStyles = makeStyles((theme: Theme) => ({
  previousStepLink: {
    textDecoration: 'none',
    color: theme.palette.secondary.dark
  },
  nextStepButton: {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.main
    }
  }
}))

const StepsBottomNavigation: FC = () => {
  const classes = useStyles()
  const [showNextButton, setShowNextButton] = useState(true)
  const [showPrevious, setShowPrevious] = useState(false)
  const { active, totalSteps, canGoToNextStep, getStepData, complete, setState } = useStepsStore(
    state => ({
      active: state.active,
      totalSteps: state.totalSteps,
      canGoToNextStep: state.canGoToNextStep,
      getStepData: state.getStepData,
      complete: state.complete,
      setState: state.setState
    }),
    shallow
  )

  useEffect(() => {
    setShowNextButton(active + 1 < totalSteps)
    setShowPrevious(active > 0)
  }, [active, totalSteps])

  const handleOnPreviousClick = () => setState(state => state.active--)

  const handleOnNextClick = () => {
    complete(active)
    setState(state => state.active++)
  }

  return (
    <Grid container justify={showPrevious ? 'space-between' : 'flex-end'} alignItems='flex-end'>
      {showPrevious && (
        <Grid item>
          <Link
            component={RouterLink}
            to={getStepData(active - 1)?.route || ''}
            className={classes.previousStepLink}
            onClick={handleOnPreviousClick}>
            <Typography variant='h6'>Previous step</Typography>
          </Link>
        </Grid>
      )}

      {showNextButton && (
        <Grid item>
          <Button
            component={RouterLink}
            to={getStepData(active + 1)?.route || ''}
            variant='contained'
            color='primary'
            endIcon={<ChevronRightIcon />}
            className={classes.nextStepButton}
            disableElevation
            disabled={!canGoToNextStep}
            onClick={handleOnNextClick}>
            Next
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default StepsBottomNavigation
