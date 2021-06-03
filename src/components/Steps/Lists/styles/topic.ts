import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { TopicStylesProps } from '../../../../types/topic'

const topicStyles = ({ palette, shape, shadows, spacing }: Theme) =>
  createStyles({
    container: ({ container }: TopicStylesProps = {}) => ({
      maxHeight: 620,
      ...container
    }),
    list: ({ list }: TopicStylesProps = {}) => ({
      backgroundColor: palette.grey[100],
      borderRadius: shape.borderRadius / 2,
      padding: `${spacing(2)}px ${spacing(2)}px 0 ${spacing(2)}px`,
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
      borderRadius: shape.borderRadius / 2,
      wordBreak: 'break-all',
      marginBottom: spacing(2),
      ...listItem
    }),
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
      padding: `${spacing(2)}px ${spacing(3)}px 0 ${spacing(3)}px`
    },
    groupHeader: {
      '&.MuiAccordionSummary-root': {
        backgroundColor: palette.common.white,
        borderRadius: shape.borderRadius / 2,
        padding: `${spacing()}px ${spacing(2)}px`,
        wordBreak: 'break-all',

        '&.Mui-expanded': {
          minHeight: 'auto'
        },
        '& .MuiAccordionSummary-content': {
          margin: `${spacing() / 2}px 0`
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
      padding: 0,
      marginLeft: spacing(2)
    }
  })

const useTopicStyles = makeStyles((theme: Theme) => topicStyles(theme))

export default useTopicStyles
