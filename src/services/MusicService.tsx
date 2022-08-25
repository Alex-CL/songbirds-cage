import { Pager, ItemList, emptyItemList, Artist, Song } from '../models'

interface IApi {
	getArtists(p: Pager, query: string): Promise<ItemList<Artist>>
}

const MAX_SONGS = 10

export class MusicService implements IApi {
	private _api: string
	
	constructor() {
		this._api = 'http://musicbrainz.org/ws/2/'
	}
	
	getArtists(p: Pager, query: string): Promise<ItemList<Artist>> {
		return fetch(`${this._api}artist/?limit=${p.limit}&offset=${p.offset}&fmt=json&query=artist:${query}%20AND%20type:group`)
            .then((res: any) => res.json())
            .then((res) => {
				if (res.artists?.length) {
					const itemList = {
					items: res.artists.map((a: any) => new Artist({id: a.id, name: a.name, country: a.country, tags: a.tags?.map((t: any) => t.name)})),
						count: res.count
					}
					return itemList
				}
				return emptyItemList<Artist>()
			})
	}
	
	getSongs(a: Artist): Promise<Song[]> {
		const limit = 100
		let offset = 0
		const result = fetch(`${this._api}recording/?fmt=json&artist=${a.id}&limit=${limit}&offset=${offset}`)
            .then((res: any) => res.json())
            .then((res) => {
            	// TODO Use property 'recording-count' to paginate
				return []
			})
			
		return result
	}
}
