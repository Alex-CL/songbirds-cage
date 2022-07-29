import { Fab, Tooltip, Icon } from '@mui/material'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import style from './GenericTooltip.module.css'
import { GenericToolTipListExpressions } from './GenericToolTipListExpressions'
import { SvgIcon } from '@mui/material'

export type GenericTooltipProps = {
  value: string
  icon: JSX.Element
  handler: () => void
}

export function GenericTooltip(props: GenericTooltipProps): JSX.Element {
  return (
    <Tooltip
      classes={{
        tooltip: style.genericTooltip,
      }}
      title={<GenericToolTipListExpressions values={[props.value]} />}
      enterTouchDelay={0}
    >
		<Icon sx={{ cursor: 'pointer' }} onClick={props.handler}>{props.icon}</Icon>   
    </Tooltip>
  )
}
