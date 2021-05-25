import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery
} from '@material-ui/core'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { CSSProperties, FC, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import shallow from 'zustand/shallow'
import { ungroupedTopicsDroppableId } from '../../../constants/steps'
import useStepsStore from '../../../stores/StepsStore'
import { TopicGroup } from '../../../types/store'
import DndTopicList from '../Lists/DndTopicList'

const useStyles = makeStyles((theme: Theme) => ({
  topicsContainer: {
    flexGrow: 1,
    maxHeight: 552
  },
  topic: {
    transition: 'all 0.1s ease-in-out',
    '&:hover': {
      boxShadow: theme.shadows[3],
      transform: 'scale(1.02, 1.02)'
    }
  },
  topicGroupContainer: {
    backgroundColor: 'inherit',
    marginBottom: theme.spacing(),

    '&::before': {
      content: 'unset'
    },
    '&.Mui-expanded': {
      marginBottom: 0
    }
  },
  topicGroupHeader: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius / 2,
    padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
    wordBreak: 'break-all',

    '&.Mui-expanded': {
      minHeight: 'unset'
    },
    '& .MuiAccordionSummary-content': {
      margin: `${theme.spacing() / 2}px 0`
    },
    '& .MuiAccordionSummary-expandIcon': {
      padding: 0,
      '&.MuiIconButton-edgeEnd': {
        marginRight: 0
      }
    }
  },
  topicGroupContentContainer: {
    padding: `${theme.spacing()}px ${theme.spacing(3)}px 0 ${theme.spacing(3)}px`,
    display: 'block'
  },
  editTopicGroupButton: {
    padding: 0,
    marginLeft: theme.spacing(2)
  },
  dialogPaper: {
    borderRadius: theme.shape.borderRadius / 2,
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0
    }
  }
}))

const GroupStep: FC = () => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const [topics, topicGroups, groupTopics, moveTopic, renameTopicGroup] = useStepsStore(
    state => [state.tempTopics, state.topicGroups, state.groupTopics, state.moveTopic, state.renameTopicGroup],
    shallow
  )

  const [open, setOpen] = useState(false)
  const [topicGroupToEdit, setTopicGroupToEdit] = useState({ id: '', name: '' })

  const handleClose = () => setOpen(false)

  const onDragEnd = (dropResult: DropResult) => {
    const { draggableId, combine, source, destination } = dropResult

    if (combine) groupTopics(draggableId, combine.draggableId)

    if (destination) moveTopic(source, destination)
  }

  const handleOnDialogSaveClick = () => {
    const { id, name } = topicGroupToEdit
    renameTopicGroup(id, name)
    setOpen(false)
  }

  const getTopicsListStyle = (): CSSProperties => ({
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius / 2,
    padding: theme.spacing(2)
  })

  return (
    <Grid container spacing={4} direction='column'>
      <Grid item>
        <Typography variant='h5' color='primary'>
          My Topics
        </Typography>
      </Grid>
      <Grid item container className={classes.topicsContainer}>
        <div style={getTopicsListStyle()}>
          <DragDropContext onDragEnd={onDragEnd}>
            {topicGroups.map((group: TopicGroup) => {
              const { id, topics, name } = group

              return (
                <Accordion key={id} className={classes.topicGroupContainer} elevation={0}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon color='primary' />}
                    aria-controls={id}
                    id={id}
                    className={classes.topicGroupHeader}>
                    <Typography variant='body1' component='span'>
                      {name}
                    </Typography>
                    <IconButton
                      aria-label='edit topic group name'
                      onClick={event => {
                        event.stopPropagation()
                        setTopicGroupToEdit({ id, name })
                        setOpen(true)
                      }}
                      className={classes.editTopicGroupButton}>
                      <EditIcon fontSize='small' color='disabled' />
                    </IconButton>
                  </AccordionSummary>
                  <AccordionDetails className={classes.topicGroupContentContainer}>
                    <DndTopicList topics={topics} droppableId={id} />
                  </AccordionDetails>
                </Accordion>
              )
            })}
            <DndTopicList topics={topics} droppableId={ungroupedTopicsDroppableId} isCombineEnabled={true} />
          </DragDropContext>
        </div>
        <Dialog
          maxWidth='sm'
          fullWidth={true}
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
          PaperProps={{ className: classes.dialogPaper }}>
          <DialogTitle id='form-dialog-title'>Edit Group Name</DialogTitle>
          <DialogContent>
            <TextField
              id='outlined-basic'
              label='What is the new name?'
              variant='outlined'
              fullWidth
              autoFocus
              size='small'
              value={topicGroupToEdit.name}
              onChange={event => setTopicGroupToEdit({ ...topicGroupToEdit, name: event.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='default'>
              Cancel
            </Button>
            <Button onClick={() => handleOnDialogSaveClick()} color='primary'>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default GroupStep
