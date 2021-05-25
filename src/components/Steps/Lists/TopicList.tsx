import { List, ListItem, ListItemText, makeStyles, Theme } from '@material-ui/core'
import { FC, ReactElement } from 'react'
import { Topic } from '../../../types/store'

export type ListItemChildrenFn = (id: string) => ReactElement<HTMLElement>

interface TopicListProps {
  topics: Topic[]
}

const useStyles = makeStyles((theme: Theme) => ({
  topicListItem: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius / 2,
    wordBreak: 'break-all',

    '&:not(:last-child)': {
      marginBottom: theme.spacing(2)
    }
  }
}))

const TopicList: FC<TopicListProps> = ({ topics }) => {
  const classes = useStyles()

  const renderTopicListItem = (id: string, name: string): JSX.Element => (
    <ListItem key={id} className={classes.topicListItem}>
      <ListItemText primary={name} />
    </ListItem>
  )

  return <List aria-label='topic-list'>{topics.map(({ id, name }) => renderTopicListItem(id, name))}</List>
}

TopicList.defaultProps = {
  topics: []
}

export default TopicList
