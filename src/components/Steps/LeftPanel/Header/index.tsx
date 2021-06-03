import { Grid, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import useStepsStore from '../../../../stores/StepsStore'

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
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
