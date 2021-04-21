import { Grid, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { FC } from 'react'
import useStepsStore from '../../../../stores/StepsStore'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(4)
    },
    title: {
      color: theme.palette.info.main,
      marginBottom: theme.spacing()
    },
    description: {
      color: theme.palette.common.white
    }
  })
)

const Header: FC = () => {
  const classes = useStyles()
  const { title, description } = useStepsStore(state => state.getActiveStepData())

  return (
    <Grid container direction='column' className={classes.header}>
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
