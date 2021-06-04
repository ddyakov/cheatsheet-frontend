import { Theme } from '@material-ui/core/styles'
import makeStyles from '@material-ui/styles/makeStyles'
import Stepper from '../Navigation/Stepper'
import Header from './Header'

const useStyles = makeStyles<Theme>(({ palette, shape, spacing }) => ({
  leftPanelContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    minWidth: 320,
    borderRadius: shape.borderRadius,
    padding: spacing(4),
    paddingBottom: spacing(12),
    backgroundColor: palette.primary.main
  }
}))

const LeftPanel = () => {
  const classes = useStyles()

  return (
    <div className={classes.leftPanelContainer}>
      <Header />
      <Stepper />
    </div>
  )
}

export default LeftPanel
