import TextField from '@material-ui/core/TextField'
import { FC, useEffect, useState } from 'react'
import useStepsStore from '../../../stores/StepsStore'

const Name: FC = () => {
  const { active, subject, incomplete, setState } = useStepsStore(state => ({
    active: state.active,
    subject: state.subject,
    incomplete: state.incomplete,
    setState: state.setState
  }))
  const [subjectName, setSubjectName] = useState(subject)

  useEffect(() => {
    const newSubject = subjectName.trim()
    const hasSubject = newSubject.length > 0

    setState(state => {
      state.subject = newSubject
      state.canGoToNextStep = hasSubject
    })

    !hasSubject && incomplete(active)

    return () => setState(state => (state.canGoToNextStep = false))
  }, [active, subjectName, incomplete, setState])

  return (
    // TODO:change the id of the TextField to something else, or make the TextField generic
    <TextField
      id='outlined-basic'
      label='What are you studying for?'
      variant='outlined'
      fullWidth
      value={subjectName}
      style={{ alignSelf: 'center' }}
      onChange={e => setSubjectName(e.target.value)}
    />
  )
}

export default Name
