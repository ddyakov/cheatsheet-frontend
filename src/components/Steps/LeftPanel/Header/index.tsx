import { Grid, Typography } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import makeStyles from '@material-ui/styles/makeStyles'
import useStepsStore from '../../../../stores/steps'

const useStyles = makeStyles<Theme>(({ palette, spacing }) => ({
  headerContainer: {
    marginBottom: spacing(4)
  },
  title: {
    color: palette.info.main,
    marginBottom: spacing()
  },
  description: {
    color: palette.common.white
  }
}))

const Header = () => {
  const classes = useStyles()
  const { title, description } = useStepsStore(state => state.getActiveStepData())

  return (
    <Grid container direction='column' className={classes.headerContainer}>
      <Grid item>
        <Typography variant='h2' className={classes.title}>
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='body2' className={classes.description}>
          {description}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Header
