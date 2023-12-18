import React, { useState } from 'react';
import Nav from '../components/Nav';
import ListItem from '../components/ListItem';
import NoResult from '../components/NoResult';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [notes, setNotes] = useState([]);
    const [searched, setSearched] = useState(false); // New state to track if search has been performed

    let searchNote = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`/api/notes/search/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({ query })
            });
            setSearched(true);
            if (response.ok && query) {
                const data = await response.json();
                setNotes(data);
            } else {
                alert('Search failed, Enter a valid query');
            }
        } catch (error) {
            alert('There was an error searching the notes:', error);
        }
    };

    return (
        <>
            <Nav />
            <div className='Search'>
                <div className="search-input">
                    <input 
                        type="text" 
                        name="query" 
                        placeholder='Search note' 
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button onClick={searchNote}>Search</button>
                </div>
            </div>
            <div className="Results">
                <div className="Notes-List">
                    {searched && notes.length === 0 ? (
                        <NoResult />
                    ) : (
                        notes.map((note, index) => <ListItem key={index} note={note} />)
                    )}
                </div>
            </div>
        </>
    )
}

export default SearchPage;
