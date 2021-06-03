import { Accordion, AccordionDetails, AccordionSummary, IconButton, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { CSSProperties, MouseEventHandler } from 'react'
import { Topic } from '../../../types/topic'
import DndTopicList from '../Lists/DndTopicList'
import useTopicStyles from '../Lists/styles/topic'

interface TopicGroupProps {
  id: string
  name: string
  topics: Topic[]
  editButtonOnClickHandler: MouseEventHandler<HTMLButtonElement> | undefined
}

const topicStylesListOverrides: CSSProperties = {
  flexGrow: 1,
  padding: 0,
  maxWidth: 365
}

const TopicGroup = ({ id, name, topics, editButtonOnClickHandler }: TopicGroupProps) => {
  const topicClasses = useTopicStyles()

  return (
    <Accordion className={topicClasses.groupContainer} elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color='primary' />}
        aria-controls={id}
        id={id}
        className={topicClasses.groupHeader}>
        <Typography variant='body1' component='span' color='primary'>
          {name}
        </Typography>
        <IconButton aria-label='edit' onClick={editButtonOnClickHandler} className={topicClasses.groupEditButton}>
          <EditIcon fontSize='small' color='disabled' />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails className={topicClasses.groupListContainer}>
        <DndTopicList topics={topics} droppableId={id} listStyle={topicStylesListOverrides} />
      </AccordionDetails>
    </Accordion>
  )
}

export default TopicGroup
