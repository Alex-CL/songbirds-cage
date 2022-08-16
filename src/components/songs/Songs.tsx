import { useEffect } from 'react'
import { useSongbirdsContext } from '../../context'

export const Songs = () => {

	const { currentArtist } = useSongbirdsContext()

	useEffect(() => {
		if (!currentArtist) {
			return
		}
	
		fetch(`http://musicbrainz.org/ws/2/release/?fmt=json&artist=${currentArtist.id}&limit=20&offset=0`)
            .then((res: any) => res.json())
            .then((res) => {
            console.log((res.releases || res.recordings || ['undefined']).map((k: any) => k.title))
        })
	}, [])

	return (
		<></>
	)
}
