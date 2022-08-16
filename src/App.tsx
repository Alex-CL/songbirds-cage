import React, { useState, useEffect } from 'react'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import './App.css'
import { 
	TablePagination,
	Typography,
	Button,	
	Box, 
	Icon,
    Stack,
    Step,
    Stepper,
    StepLabel } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import MapIcon from '@mui/icons-material/Map';
import { SearchComponent } from './components/search'
import { SongsComponent } from './components/songs'
import { Artist, ItemList, Pager } from './models/'
import {
    Actions,
    Sort,
} from './components/table/types'
import { AppTable, Field } from './components/table'
import { useTranslation } from 'react-i18next'
import { FirstStep } from './components'
import { SongbirdsProvider, useSongbirdsContext } from './context'

const steps = [
	{
		label: 'Search an artist',
		icon: GroupsIcon
	}, {
		label: 'Your songs',
		icon: MusicNoteIcon
	}, {
		label: 'Build your map!',
		icon: MapIcon
	}		
];

// TODO Fix prettierrc rules
function App() {
    const { t } = useTranslation()
    
    const { currentArtist } = useSongbirdsContext()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [currentStep, setCurrentStep] = useState<number>(0)
    
    const titleStyle = {
    	fontSize: '2rem',
    	fontWeight: 'bold',
    	margin: '10px auto',
	   	textAlign: 'center', 
	   	background: 'linear-gradient(90deg, rgba(230,20,137,1) 0%, rgba(230,20,137,1) 45%, rgba(0,0,0,1) 100%)',
	   	WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent'
    }
    
   // TODO Apply stepper
    return (
    	<SongbirdsProvider>
		    <Box sx={{
		    	width: '60%',
		    	margin: 'auto'
		    }}>
		        <Typography variant="h1" sx={titleStyle}>Songbirds</Typography>
		        <Stack sx={{ width: '100%' }} spacing={4}>
				  <Stepper alternativeLabel activeStep={currentStep} >
					{steps.map((step, i) => (
					  <Step key={step.label}>
						<StepLabel sx={{ cursor: 'pointer' }} StepIconComponent={step.icon} onClick={() => setCurrentStep(i)}>{step.label}</StepLabel>
					  </Step>
					))}
				  </Stepper>
				</Stack>
				{currentStep === 0 && (
					<FirstStep />
				)}
				{currentStep === 1 && 
					<Box>
						<SongsComponent/>
						<Button variant="outlined" onClick={() => setCurrentStep(0)}>{t('Back')}</Button>
					</Box>
				}
			</Box>
		</SongbirdsProvider>
    )
}

export default App
