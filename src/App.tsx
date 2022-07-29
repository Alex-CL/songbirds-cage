import React, { useState, useEffect } from 'react'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import './App.css'
import { 
	TablePagination,
	Button,	
	Box, 
	Icon,
    Stack,
    Step,
    Stepper,
    StepLabel } from '@mui/material'
import { SearchComponent } from './components/search'
import { SongsComponent } from './components/songs'
import { Artist, ItemList, Pager } from './models/'
import {
    Actions,
    Sort,
} from './components/table/types'
import { AppTable, Field } from './components/table'
import { useTranslation } from 'react-i18next'
import VisibilityIcon from '@mui/icons-material/Visibility';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const steps = ['Search an artist', 'Your songs! :D'];

// TODO Fix prettierrc rules
function App() {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [itemsPerPage, setItemsPerPage] = useState<number>(10)
    const [page, setPage] = useState<number>(0)
    const [count, setCount] = useState<number>(0)
    const [items, setItems] = useState<Artist[]>([])
    const [pager, setPager] = useState<Pager>({limit: itemsPerPage, offset: page})
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [currentArtist, setCurrentArtist] = useState<Artist | undefined>(undefined)

	// TODO Review limit
    useEffect(() => {
        setIsLoading(true)
        setPager({
            limit: itemsPerPage,
            offset: page,
        })
    }, [page, itemsPerPage])

    const fields: Field<Artist>[] = [
        {
            sortable: true,
            searchable: true,
            label: 'Name',
            name: 'name',
        },
        {
            sortable: true,
            searchable: true,
            label: 'Country',
            name: 'country',
            renderFunc: (f, i) => i.country ? i.country + getUnicodeFlagIcon(i.country) : '',
        },
        {
            sortable: true,
            searchable: true,
            label: 'Tags',
            name: 'tags',
        },
    ]

    const switchSelectedArtist = (a: Artist) => {
		const newItems = [...items]
    	if (currentArtist && currentArtist.id !== a.id) {
    		currentArtist.isCurrent = false
    		const index = items.findIndex((i) => i.id === currentArtist.id)
    		newItems.splice(index, 1, currentArtist)
    	}
    
    	const index = items.findIndex((i) => i.id === a.id)
    	if (index !== -1) {
    		const item = newItems[index]
    		const newItem = new Artist({
    			id: item.id,
    			name: item.name,
    			country: item.country,
    			tags: item.tags,
    			isCurrent: !item.isCurrent,
    		})
    		newItems.splice(index, 1, newItem)
    		setItems(newItems)
    	} 
    }

    const actions: Actions<Artist> = {
        actionsColumn: t('Actions'),
        items: [
            {
                handler: switchSelectedArtist,
                icon: (<RadioButtonUncheckedIcon />),
                label: t('Select'),
                hidden: (f) => f.isCurrent
            }, {
            	handler: switchSelectedArtist,
            	icon: (<CheckCircleOutlineIcon />),
            	label: t('Unselect'),
            	hidden: (f) => !f.isCurrent
            }
        ],
    }

    const handlePaginationChange = (event: unknown, value: number) =>
        setPage(value)

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (Number.isNaN(event.target.value)) {
            setItemsPerPage(10)
            return
        }
        setItemsPerPage(Number.parseInt(event.target.value))
    }
      
    useEffect(() => {
    	setIsLoading(true)
    	const current = items.find((i) => i.isCurrent)
    	if (!current) {
	    	return
    	}
    	setCurrentArtist(current)
    	setCurrentStep(currentStep + 1)
    }, [items])
    
    const handleStepChange = (s: number) => {
    	 if (s < currentStep) {
    	 	setCurrentStep(s)
    	 }
    }
    
    const passArtists = (il: ItemList<Artist>) => {
    	setItems(il.items)
    	setCount(il.count)
    }
   
   // TODO Apply stepper
    return (
        <Box sx={{
        	width: '60%',
        	margin: 'auto'
        }}>
            <h1 style={{ textAlign: 'center' }}>Songbirds</h1>
            <Stack sx={{ width: '100%' }} spacing={4}>
			  <Stepper alternativeLabel activeStep={currentStep} >
				{steps.map((label, i) => (
				  <Step key={label}>
				    <StepLabel sx={{ cursor: 'pointer' }} StepIconComponent={VisibilityIcon} onClick={() => handleStepChange(i)}>{label}</StepLabel>
				  </Step>
				))}
			  </Stepper>
			</Stack>
			{currentStep === 0 && (
				<>
		  	    	<Box sx={{ textAlign: 'center', marginTop: '20px' }}>
		  	    		<SearchComponent passArtists={passArtists} pager={pager}/>
	  	    		</Box>
					{items.length > 0 &&
						(
							<>
								<AppTable
									actions={actions}
									fields={fields}
									items={items}
									rowKeyField={'id'}
								/>
								<TablePagination
								  labelRowsPerPage={t('Resultados por página')}
								  count={count}
								  onPageChange={(_, p: number) => setPage(p)}
								  page={page}
								  rowsPerPage={itemsPerPage}
								  onRowsPerPageChange={handleChangeRowsPerPage}
								  rowsPerPageOptions={[10]}
								  component="div"
								  SelectProps={{
									style: {
									  border: '1px solid #D1D1D1',
									  borderRadius: '3px',
									},
								  }}
								  backIconButtonProps={{
									style: {
									  color: page === 0 ? '#b5b8c4' : '#7cb5ec',
									  border: '1px solid #D1D1D1',
									  borderRadius: '3px',
									  width: '30px',
									  height: '30px',
									},
								  }}
								  nextIconButtonProps={{
									style: {
									  color: count - (page + 1) * itemsPerPage <= 0 ? '#b5b8c4' : '#7cb5ec',
									  border: '1px solid #D1D1D1',
									  borderRadius: '3px',
									  width: '30px',
									  height: '30px',
									},
  								}}
								/>
							</>
							
						)
				    }
			    </>
			)}
			{currentStep === 1 && currentArtist && 
				<Box>
					<SongsComponent artist={currentArtist}/>
					<Button variant="outlined" onClick={() => handleStepChange(0)}>{t('Back')}</Button>
				</Box>
			}
		</Box>
    )
}

export default App
