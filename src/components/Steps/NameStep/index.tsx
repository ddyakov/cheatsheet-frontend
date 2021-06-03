import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import shallow from 'zustand/shallow'
import useStepsStore from '../../../stores/StepsStore'

const useStyles = makeStyles(() => ({
  subjectTextFieldContainer: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center'
  }
}))

const NameStep = () => {
  const classes = useStyles()
  const [subject, setSubject] = useStepsStore(state => [state.subject, state.setSubject], shallow)

  return (
    <div className={classes.subjectTextFieldContainer}>
      <TextField
        id='subject'
        label='What are you studying for?'
        fullWidth={true}
        value={subject}
        onChange={e => setSubject(e.target.value)}
        onBlur={e => setSubject(e.target.value.trim())}
        autoComplete='off'
      />
    </div>
  )
}

export default NameStep
