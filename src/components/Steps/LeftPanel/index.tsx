import { Grid } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { FC } from 'react'
import { Stepper } from '../Navigation'
import Header from './Header'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    leftPanel: {
      // [theme.breakpoints.down('sm')]: {
      //   width: '100%'
      // },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(4),
      background: theme.palette.primary.main
    }
  })
)

const LeftPanel: FC = () => {
  const classes = useStyles()

  return (
    <Grid xs={12} md={5} item className={classes.leftPanel}>
      <Header />
      <Stepper />
    </Grid>
  )
}

export default LeftPanel
