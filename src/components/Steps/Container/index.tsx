import { Container as MuiContainer, Grid, Paper } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { FC, ReactNode, useEffect } from 'react'
import { useHistory } from 'react-router'
import useStepsStore from '../../../stores/StepsStore'
import LeftPanel from '../LeftPanel'
import StepsBottomNavigation from '../Navigation/BottomNavigation'

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    background: `linear-gradient(103.67deg, ${theme.palette.common.white} 0%, ${theme.palette.secondary.light} 100%)`
  },
  stepContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  },
  stepContent: {
    padding: theme.spacing(4)
  },
  stepContentContainer: {
    flexGrow: 1,
    paddingBottom: theme.spacing(4)
  }
}))

interface ComponentProps {
  children: ReactNode
}

const Container: FC<ComponentProps> = ({ children }) => {
  const classes = useStyles()
  const history = useHistory()
  const { route } = useStepsStore(state => state.getActiveStepData())

  useEffect(() => history.push(route), [history, route])

  useEffect(() => document.body.classList.add(classes.body), [classes.body])

  return (
    <MuiContainer maxWidth='md' className={classes.stepContainer}>
      <Paper elevation={4}>
        <Grid container>
          <LeftPanel />
          <Grid container item xs={12} md={7} direction='column' className={classes.stepContent}>
            <Grid container justify='center' className={classes.stepContentContainer}>
              {children}
            </Grid>
            <StepsBottomNavigation />
          </Grid>
        </Grid>
      </Paper>
    </MuiContainer>
  )
}

export default Container
