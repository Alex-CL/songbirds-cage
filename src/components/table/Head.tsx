import React from 'react'
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { Actions, Field, Sort } from './types'
import { styled } from "@mui/material/styles";

type HeadProps<T> = {
  readonly fields: Field<T>[]
  readonly sort?: Sort<T>
  readonly actions?: Actions<T>
}

export function Head<T extends { [key: string]: any }>(props: HeadProps<T>) {
  const handleSort = (name: keyof T) => () => props.sort?.handleSort && props.sort.handleSort(name)

  const head =  {
      fontWeight: 'bold',
      backgroundColor: '#FFFFFF',
      color: '#515151',
      fontSize: '14px',
      borderBottom: '3px solid #68B3E0',
    }
    
    const actions = {
      fontWeight: 'bold',
      backgroundColor: '#FFFFFF',
      color: '#515151',
      fontSize: '14px',
      borderBottom: '3px solid #68B3E0',
    }
    
  const headCells = Object.values(props.fields).map((f) => (
    <TableCell sx={head} key={f.name as string}>
      {f.sortable ? (
        <TableSortLabel
          active={f.name === props.sort?.name}
          direction={props.sort?.direction || 'asc'}
          onClick={handleSort(f.name)}>
          {f.label}
        </TableSortLabel>
      ) : (
        f.label
      )}
    </TableCell>
  ))

  return (
    <TableHead>
      <TableRow>
        {headCells}
        {props.actions && props.actions.actionsColumn && (
          <TableCell sx={actions}>{props.actions.actionsColumn}</TableCell>
        )}
      </TableRow>
    </TableHead>
  )
}
