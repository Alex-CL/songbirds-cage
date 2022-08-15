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
import VisibilityIcon from '@mui/icons-material/Visibility'
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

const steps = ['Search an artist', 'Your songs', 'Build your map!'];

// TODO Fix prettierrc rules
function App() {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [currentArtist, setCurrentArtist] = useState<Artist | undefined>(undefined)
    
    const handleStepChange = (s: number) => {
    	 if (s < currentStep) {
    	 	setCurrentStep(s)
    	 }
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
				<FirstStep />
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
