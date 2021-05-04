import { FC, useEffect, useState } from 'react'
import useStepsStore from '../../../stores/StepsStore'
import CheatSheetTextField from '../../Common/CheatSheetTextField'

const Name: FC = () => {
  const { subject, setState } = useStepsStore(state => ({
    subject: state.subject,
    setState: state.setState
  }))
  const [subjectName, setSubjectName] = useState(subject)

  useEffect(() => {
    const newSubject = subjectName.trim()

    setState(state => {
      state.subject = newSubject
      state.canGoToNextStep = newSubject.length > 0
    })

    return () => setState(state => (state.canGoToNextStep = false))
  }, [subjectName, setState])

  return (
    <CheatSheetTextField
      id='outlined-basic'
      label='What are you studying for?'
      variant='outlined'
      fullWidth
      value={subjectName}
      onChange={e => setSubjectName(e.target.value)}
    />
  )
}

export default Name
