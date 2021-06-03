import { Paper } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { FC, useEffect } from 'react'
import { useHistory } from 'react-router'
import useStepsStore from '../../stores/StepsStore'
import LeftPanel from './LeftPanel'
import StepsBottomNavigation from './Navigation/BottomNavigation'

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  body: {
    background: `linear-gradient(103.67deg, ${palette.common.white} 0%, ${palette.secondary.light} 100%)`
  },
  stepOuterContainer: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: `0 ${spacing(3)}px`
  },
  stepInnerContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: 830
  },
  stepOuterContentContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    padding: spacing(4)
  },
  stepInnerContentContainer: {
    display: 'flex',
    flexGrow: 1,
    paddingBottom: spacing(4)
  },
  stepContent: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column'
  }
}))

const Container: FC = ({ children }) => {
  const classes = useStyles()
  const history = useHistory()
  const { route } = useStepsStore(state => state.getActiveStepData())

  useEffect(() => history.push(route), [history, route])

  useEffect(() => document.body.classList.add(classes.body), [classes.body])

  return (
    <div className={classes.stepOuterContainer}>
      <Paper elevation={4} className={classes.stepInnerContainer}>
        <LeftPanel />
        <div className={classes.stepOuterContentContainer}>
          <div className={classes.stepInnerContentContainer}>
            <div className={classes.stepContent}>{children}</div>
          </div>
          <StepsBottomNavigation />
        </div>
      </Paper>
    </div>
  )
}

export default Container
