import { Button, Grid, Link, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { FC, useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import shallow from 'zustand/shallow'
import useStepsStore from '../../../../stores/StepsStore'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
)

const StepsBottomNavigation: FC = () => {
  const classes = useStyles()
  const [showNextButton, setShowNextButton] = useState(true)
  const [showPrevious, setShowPrevious] = useState(false)
  const { set, activeStep, stepsCount, getStepData } = useStepsStore(
    state => ({
      set: state.set,
      activeStep: state.activeStep,
      stepsCount: state.stepsCount,
      getStepData: state.getStepData
    }),
    shallow
  )

  useEffect(() => {
    console.log(activeStep, stepsCount)
    setShowNextButton(activeStep + 1 < stepsCount)
    setShowPrevious(activeStep > 0)
  }, [activeStep, stepsCount])

  const handleOnStepNavigationClick = (step: number) => {
    set((state: any) => {
      state.activeStep = step
    })
  }

  return (
    <Grid container justify={showPrevious ? 'space-between' : 'flex-end'} alignItems='flex-end'>
      {showPrevious && (
        <Grid item>
          <Link
            component={RouterLink}
            to={getStepData(activeStep - 1)?.route || ''}
            className={classes.previousStepLink}
            onClick={() => handleOnStepNavigationClick(activeStep - 1)}>
            <Typography variant='h6'>Previous step</Typography>
          </Link>
        </Grid>
      )}

      {showNextButton && (
        <Grid item>
          <Button
            component={RouterLink}
            to={getStepData(activeStep + 1)?.route || ''}
            variant='contained'
            color='primary'
            endIcon={<ChevronRightIcon />}
            className={classes.nextStepButton}
            disableElevation
            onClick={() => handleOnStepNavigationClick(activeStep + 1)}>
            Next
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default StepsBottomNavigation
