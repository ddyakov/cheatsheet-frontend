import { Container as MuiContainer, Grid, Paper } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { FC, ReactNode, useEffect } from 'react'
import LeftPanel from '../LeftPanel'
import StepsBottomNavigation from '../Navigation/BottomNavigation'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      background: `linear-gradient(103.67deg, ${theme.palette.common.white} 0%, ${theme.palette.secondary.light} 100%)`
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    },
    contentGridItem: {
      padding: theme.spacing(4),
      borderRadius: theme.shape.borderRadius
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 2,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: theme.spacing(3)
    }
  })
)

interface ComponentProps {
  children: ReactNode
}

const Container: FC<ComponentProps> = ({ children }) => {
  const classes = useStyles()

  useEffect(() => document.body.classList.add(classes.body), [classes.body])

  return (
    <MuiContainer maxWidth='md' className={classes.container}>
      <Paper elevation={4}>
        <Grid container>
          <LeftPanel />
          <Grid
            container
            xs={12}
            md={7}
            item
            direction='column'
            className={classes.contentGridItem}>
            <div className={classes.contentContainer}>{children}</div>
            <StepsBottomNavigation />
          </Grid>
        </Grid>
      </Paper>
    </MuiContainer>
  )
}

export default Container

// <div className='StepsContainer'>
//   <StepsStepper />
//   <div className='Container__StepContent'>
//     {children}
//     <StepsBottomNavigation />
//   </div>
// </div>
