import { DialogContentText } from '@mui/material'

import style from './GenericTooltipListExpressions.module.css'

type GenericToolTipListExpressionsProps = {
  values: string[]
}

export function GenericToolTipListExpressions(
  props: GenericToolTipListExpressionsProps
): JSX.Element {
  return (
    <>
      {props.values.map((exp, i) => (
        <DialogContentText
          className={style.genericValueTooltip}
          key={'genericValueTooltip' + exp + i}>
          {exp}
        </DialogContentText>
      ))}
    </>
  )
}
