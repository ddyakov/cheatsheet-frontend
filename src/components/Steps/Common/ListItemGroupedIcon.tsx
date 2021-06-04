import { ListItemIcon, Tooltip } from '@material-ui/core'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'

interface ListItemGroupedIconProps {
  groupId: string | null | undefined
}

const ListItemGroupedIcon = ({ groupId }: ListItemGroupedIconProps) => {
  return groupId ? (
    <ListItemIcon>
      <Tooltip title='Grouped' color='primary'>
        <PlaylistAddCheckIcon fontSize='small' />
      </Tooltip>
    </ListItemIcon>
  ) : null
}

export default ListItemGroupedIcon
