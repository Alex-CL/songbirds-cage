import React from 'react'
import { Box, Table, TableContainer } from '@mui/material'
import { Head } from './Head'
import { Pagination } from './Pagination'
import { Body } from './Body'
import { Actions, Field, Pager, Search, Sort } from './types'
import { Searcher } from './Searcher'
import useMediaQuery from '@mui/material/useMediaQuery';
import { ListTable } from './ListTable'

const DEFAULT_ROW_KEY = 'id'

export type TableProps<T, Q> = {
  readonly fields: Field<T>[]
  readonly items: T[]
  readonly rowKeyField: keyof T

  readonly actions?: Actions<T>
  readonly search?: Search<Q>
  readonly sort?: Sort<T>
  readonly pager?: Pager
}

export function AppTable<T extends { [key: string]: any }, Q extends { [key: string]: any }>(
  props: TableProps<T, Q>
) {
  return (
    <>
      <Box display={'flex'} justifyContent={'flex-end'}>
        {props.search && <Searcher search={props.search} />}
      </Box>
      <TableContainer>
        {useMediaQuery('(min-width:599px)') ? (
          <Table style={{ border: 'none' }}>
            <Head fields={props.fields} sort={props.sort} actions={props.actions} />
            <Body
              actions={props.actions}
              fields={props.fields}
              items={props.items}
              rowKeyField={props.rowKeyField || DEFAULT_ROW_KEY}
            />
          </Table>
        ) : (
        <ListTable
            actions={props.actions}
            fields={props.fields}
            items={props.items}
            rowKeyField={props.rowKeyField || DEFAULT_ROW_KEY}
          />
        )}
      </TableContainer>
      <Box display={'flex'} justifyContent={'flex-end'}>
        {props.pager && <Pagination {...props.pager} />}
      </Box>
    </>
  )
}
