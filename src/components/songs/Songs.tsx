import { useEffect } from 'react'
import { MusicService } from '../../services'
import { useSongbirdsContext } from '../../context'

const musicService = new MusicService()

export const Songs = () => {

	const { currentArtist } = useSongbirdsContext()

	useEffect(() => {
		if (!currentArtist) {
			return
		}
	
		musicService.getSongs(currentArtist).then((s) => console.log(s))
	}, [])

	return (
		<></>
	)
}
