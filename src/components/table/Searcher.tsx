import React, { useState } from 'react'
import { Search, SearchValue } from './types'
import { Box, TextField } from '@mui/material'

type SearchProps<Q> = {
  readonly search: Search<Q>
}

export function Searcher<Q extends { [key: string]: any }>(props: SearchProps<Q>) {
  const [values, setValues] = useState<SearchValue<Q>[]>(props.search.searchValues)

  const handleSubmit = () => props.search.handleSearch([...values])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    values.find((sv) => e.target.name === sv.name)!.value = e.target.value
    setValues([...values])
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box marginBottom="5px">
        <Box display="flex" flexWrap="wrap">
          {values.map((v) => (
            <Box mr={2} width={v.width} key={v.name as string}>
              <TextField
                name={v.name as string}
                label={v.label}
                onChange={handleChange}
                onKeyPress={handleSubmit}
                type={v.type || 'text'}
                value={v.value || ''}
                variant="outlined"
                size="small"
              />
            </Box>
          ))}
        </Box>
      </Box>
    </form>
  )
}
