import React, { useState, useEffect } from 'react';
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Artist, ItemList, Pager } from '../../models';

type SearchProps = {
	passArtists: (il: ItemList<Artist>) => void,
	pager: Pager
}

export const Search = (props: SearchProps) => {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    
    useEffect(() => {
    	searchBand()
    }, [props.pager])

    const searchBand = () => {
    	if (!searchQuery) {
    		return
    	}
        fetch(`http://musicbrainz.org/ws/2/artist/?limit=${props.pager.limit}&offset=${props.pager.offset}&fmt=json&query=artist:${searchQuery}%20AND%20type:group`)
            .then((res: any) => res.json())
            .then((res) => {
		if (res.artists?.length) {
			const itemList = {
				items: res.artists.map((a: any) => new Artist({id: a.id, name: a.name, country: a.country, tags: a.tags?.map((t: any) => t.name)})),
				count: res.count
			}
			props.passArtists(itemList)	
		}
	}
	)
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    	if (e.key === 'Enter') {
    		searchBand()
    	}
    }
    
    const searchTextStyle = {
    	width: '300px'
    }

    return (
		<>
            <TextField
                id="search-bar"
                className="text"
                onInput={handleChange}
                onKeyPress={handleKeyPress}
                label="Enter a band's name"
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={searchTextStyle}
            />
            <IconButton onClick={searchBand} aria-label="search">
                <SearchIcon style={{ fill: 'blue' }} />
            </IconButton>
		</>
    )
}
