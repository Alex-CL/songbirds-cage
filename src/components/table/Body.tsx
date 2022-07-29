import React from 'react'
import { Box, TableBody, TableCell, TableRow } from '@mui/material'
import { Actions, Field } from './types'
import { GenericTooltip } from '../generic-tooltip'
import { useTranslation } from 'react-i18next'
import { styled } from "@mui/material/styles"

export type BodyProps<T> = {
  readonly fields: Field<T>[]
  readonly items: T[]
  readonly rowKeyField: keyof T
  readonly actions?: Actions<T>
}

const maxString = 50

// TODO Tooltip when text has ellipsis
// TODO Show country flag
export function Body<T extends { [key: string]: any }>(props: BodyProps<T>) {
  const { t } = useTranslation()
  
  const body = {
	  fontSize: '14px',
      fontFamily: 'poppins',
      borderBottom: '1px solid #D1D1D1',
      padding: '0 auto 0 auto'   
  }
  
  const icon = {
      verticalAlign: 'middle',
      cursor: 'pointer',
      paddingTop: '0',
      paddingBottom: '0',
  }

  const rows = props.items.map((item) => {
    const actionStyle = props.actions?.styleFunc
      ? props.actions.styleFunc(item)
      : {}
    return (
      <TableRow 
      	sx={body} 
		key={item[props.rowKeyField]}>
        {Object.values(props.fields).map((field) => {
          const style = field.styleFunc ? field.styleFunc(field, item) : {}
          let content = Array.isArray(item[field.name]) ? item[field.name].join(', ') : item[field.name]
          if (content?.length > maxString) {
          	content = content.substring(0, maxString) + '...'
          }
          return (
            <TableCell
              sx={ {...body, ...style} }
              key={item[props.rowKeyField] + (field.name as string)}
            >
            {field.renderFunc
                ? field.renderFunc(field, item)
                : content}
            </TableCell>
          )
        })}

        {props.actions && props.actions.items?.length > 0 && (
          <TableCell
            sx={ { ...body, ...actionStyle} }
            key={item[props.rowKeyField] + 'cell'}
          >
            <Box display="flex" justifyContent="space-between">
              {props.actions.items.map((a) => {
                if (a.hidden && a.hidden(item)) {
                  return
                }
                return (
                  <GenericTooltip
                    value={t(a.label || '')}
                    icon={a.icon}
                    handler={() => a.handler(item)}
                  />
                )
              })}
            </Box>
          </TableCell>
        )}
      </TableRow>
    )
  })

  return <TableBody>{rows}</TableBody>
}
