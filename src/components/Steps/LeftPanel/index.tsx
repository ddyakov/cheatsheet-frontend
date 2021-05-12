import { Grid } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { FC } from 'react'
import { Stepper } from '../Navigation'
import Header from './Header'

const useStyles = makeStyles((theme: Theme) => ({
  leftPanel: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.main
  }
}))

const LeftPanel: FC = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      item
      xs={12}
      md={5}
      direction='column'
      alignItems='center'
      className={classes.leftPanel}>
      <Header />
      <Stepper />
    </Grid>
  )
}

export default LeftPanel
