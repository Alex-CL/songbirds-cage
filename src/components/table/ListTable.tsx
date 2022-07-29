import React from 'react'
import { Actions, Field } from './types'
import { Box, List, InputLabel, IconButton } from '@mui/material'

export type ListTableProps<T> = {
  readonly fields: Field<T>[]
  readonly items: T[]
  readonly rowKeyField: keyof T
  readonly actions?: Actions<T>
}

// FIXME Icon button is not working
export function ListTable<T extends { [key: string]: any }>(
  props: ListTableProps<T>
) {

  const body = {
    fontSize: '14px',
    fontFamily: 'poppins',
    borderBottom: '1px solid #D1D1D1',
    padding: '0 auto 0 auto',
  }
  
  const icon = {
    cursor: 'pointer',
    width: '20px',
    height: '100%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '10px',
  }
  
  const listItem = {
    borderBottom: '3px solid #68b3e0', //--color-light-blue
  }
  
  const key = {
    fontWeight: 'bold',
    marginTop: 'auto',
    marginBottom: 'auto',
  }
  
  const cell = {
    borderBottom: '1px solid #ABB8B8',
    minHeight: '45px',
  }
  
  const actionsCell = {
    minHeight: '45px',
  }

  return (
    <List>
      <Box sx={listItem} />
      {props.items.map((item) => {
        const actionStyle = props.actions?.styleFunc
          ? props.actions.styleFunc(item)
          : {}
        return (
          <Box
            key={item[props.rowKeyField]}
            sx={listItem}
            display={'flex'}
            flexDirection={'column'}
          >
            {Object.values(props.fields).map((field) => {
              const style = field.styleFunc ? field.styleFunc(field, item) : ''
              return (
                <Box
                  justifyContent={'space-between'}
                  display={'flex'}
                  sx={cell}
                >
                  <InputLabel sx={key}>{field.label}</InputLabel>
                  <InputLabel sx={style}>
                    {field.renderFunc
                      ? field.renderFunc(field, item)
                      : item[field.name].toString()}
                  </InputLabel>
                </Box>
              )
            })}
            {props.actions && props.actions.items?.length > 0 && (
              <Box
                style={{ verticalAlign: 'middle', height: '100%' }}
                sx={{ ...actionsCell, ...actionStyle }}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
              >
                <InputLabel sx={key}>{props.actions.actionsColumn}</InputLabel>
                <Box>
                  {props.actions.items.map((a) => {
                    if (a.hidden && a.hidden(item)) {
                      return <></>
                    }
                    return (
                      <IconButton
                        sx={icon}
                        key={item[props.rowKeyField]}
                        onClick={() => a.handler(item)}
                      >
                      	{/*a.icon*/}
                      </IconButton>
                    )
                  })}
                </Box>
              </Box>
            )}
          </Box>
        )
      })}
    </List>
  )
}
