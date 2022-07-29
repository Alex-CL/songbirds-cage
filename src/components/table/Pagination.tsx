import React from 'react'
import { TablePagination } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { Pager } from './types'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  root: {
    border: '0',
    fontSize: '13px',
    color: '#515151',
    fontWeight: 'normal',
  },
})

const rowsPerPageOptions = [10, 20, 50, 100]

export function Pagination(props: Pager) {
  const { t } = useTranslation()
  const classes = useStyles()

  const [rowsPerPage, setRowsPerPage] = React.useState<number>(
    props.rowsPerPage || rowsPerPageOptions[0]
  )

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (props.handleChangeRowsPerPage) {
      setRowsPerPage(parseInt(event.target.value))
      props.handleChangeRowsPerPage(event)
    }
  }

  return (
    <TablePagination
      labelDisplayedRows={({ from, to, count }) => {
        return ''
      }}
      labelRowsPerPage={t('Resultados por página')}
      count={props.count}
      onPageChange={props.handleChangePage}
      page={props.page}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      SelectProps={{
        style: {
          border: '1px solid #D1D1D1',
          borderRadius: '3px',
        },
      }}
      classes={{
        root: classes.root,
      }}
      backIconButtonProps={{
        style: {
          color: props.page === 0 ? '#b5b8c4' : '#7cb5ec',
          border: '1px solid #D1D1D1',
          borderRadius: '3px',
          width: '30px',
          height: '30px',
        },
      }}
      nextIconButtonProps={{
        style: {
          color: props.count - (props.page + 1) * rowsPerPage <= 0 ? '#b5b8c4' : '#7cb5ec',
          border: '1px solid #D1D1D1',
          borderRadius: '3px',
          width: '30px',
          height: '30px',
        },
      }}
    />
  )
}
