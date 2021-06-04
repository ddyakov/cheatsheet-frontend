import { Theme } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import { TopicStylesProps } from '../../../types/topics'

const useTopicStyles = makeStyles<Theme>(({ palette, shape, shadows, spacing }) =>
  createStyles({
    container: ({ container }: TopicStylesProps = {}) => ({
      maxHeight: 620,
      ...container
    }),
    list: ({ list }: TopicStylesProps = {}) => ({
      backgroundColor: palette.grey[100],
      borderRadius: +shape.borderRadius / 2,
      padding: `${spacing(2)} ${spacing(2)} 0 ${spacing(2)}`,
      overflowY: 'auto',
      maxHeight: 590,
      ...list
    }),
    listEmpty: ({ listEmpty }: TopicStylesProps = {}) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: palette.primary.light,
      ...listEmpty
    }),
    listItem: ({ listItem }: TopicStylesProps = {}) => ({
      backgroundColor: palette.common.white,
      borderRadius: +shape.borderRadius / 2,
      wordBreak: 'break-all',
      marginBottom: spacing(2),
      ...listItem
    }),
    listItemTextFlexNone: {
      '&.MuiListItemText-root': {
        // flex: 'none'
      }
    },
    listItemTextGroupIcon: {
      '&.MuiSvgIcon-root': {
        marginLeft: spacing(2),

        '&:hover': {
          cursor: 'default'
        }
      }
    },
    listItemCrossedOut: ({ listItemCrossedOut }: TopicStylesProps = {}) => ({
      textDecoration: 'line-through',
      ...listItemCrossedOut
    }),
    listItemHoverPointer: {
      '&:hover': {
        cursor: 'pointer'
      }
    },
    listItemHoverShadow: {
      transition: 'box-shadow 0.1s ease-in-out',

      '&:hover': {
        boxShadow: shadows[3]
      }
    },
    groupContainer: {
      '&.MuiAccordion-root': {
        backgroundColor: 'inherit',
        marginBottom: spacing(2),

        '&.Mui-expanded': {
          margin: 0
        },
        '&::before': {
          content: 'unset'
        }
      }
    },
    groupListContainer: {
      '&.MuiAccordionDetails-root': {
        padding: `${spacing(2)} ${spacing(3)} 0 ${spacing(3)}`
      }
    },
    groupHeader: {
      '&.MuiAccordionSummary-root': {
        backgroundColor: palette.common.white,
        borderRadius: +shape.borderRadius / 2,
        padding: `${spacing()} ${spacing(2)}`,
        wordBreak: 'break-all',

        '&.Mui-expanded': {
          minHeight: 'auto'
        },
        '& .MuiAccordionSummary-content': {
          margin: '4px 0'
        },
        '& .MuiAccordionSummary-expandIcon': {
          padding: 0,
          '&.MuiIconButton-edgeEnd': {
            marginRight: 0
          }
        }
      }
    },
    groupEditButton: {
      '&.MuiIconButton-root': {
        padding: 0,
        marginLeft: spacing(2)
      }
    }
  })
)

export default useTopicStyles
