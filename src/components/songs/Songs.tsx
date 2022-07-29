import { useEffect } from 'react'
import { Artist } from '../../models/Artist'

type SongsProps = {
	artist: Artist
}

export const Songs = (props: SongsProps) => {

	useEffect(() => {
		fetch(`http://musicbrainz.org/ws/2/release/?fmt=json&artist=${props.artist.id}&limit=20&offset=0`)
            .then((res: any) => res.json())
            .then((res) => {
            console.log((res.releases || res.recordings || ['undefined']).map((k: any) => k.title))
        })
	}, [])

	return (
		<></>
	)
}
