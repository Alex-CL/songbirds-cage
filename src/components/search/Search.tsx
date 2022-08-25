import React, { useState, useEffect } from 'react';
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Artist, ItemList, Pager } from '../../models';
import { MusicService } from '../../services'

type SearchProps = {
	passArtists: (il: ItemList<Artist>) => void,
	pager: Pager
}

const musicService = new MusicService()

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
        
        musicService.getArtists(props.pager, searchQuery).then((il) => props.passArtists(il))
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
