import { makeStyles, Theme } from '@material-ui/core/styles'
import { Stepper } from '../Navigation'
import Header from './Header'

const useStyles = makeStyles(({ palette, shape, spacing }: Theme) => ({
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
