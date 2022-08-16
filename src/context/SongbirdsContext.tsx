import { createContext, ReactNode, useContext, useState } from 'react'
import { Artist } from '../models'

interface IState {
	currentArtist: Artist | undefined
	changeCurrentArtist?: (a: Artist | undefined) => void
}

const defaultState = {
	currentArtist: undefined
}

export const SongbirdsContext = createContext<IState>(defaultState)

type ProviderProps = {
	children: ReactNode
}

export const useSongbirdsContext = () => useContext(SongbirdsContext)

export const SongbirdsProvider = (props: ProviderProps) => {
	const [currentArtist, setCurrentArtist] = useState<Artist | undefined>(defaultState.currentArtist)
	
	const changeCurrentArtist = (a: Artist | undefined) => { setCurrentArtist(a)
	console.log(a)}
	
	return (
		<SongbirdsContext.Provider value={{ currentArtist, changeCurrentArtist }}>
			{props.children}
		</SongbirdsContext.Provider>
	)
}
