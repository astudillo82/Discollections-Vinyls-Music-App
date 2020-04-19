import React, { useState, useEffect } from 'react'
import { favorites } from '../../services/firestoreData'

const AddFavorites = () => {  
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const getFavorites = await favorites()
            setFavs(getFavorites)
        }
        fetch()
    }, [])

    return (
        <div>
            {favs.map(item => (
                <div>
                    <p>{item.title}</p>
                    <p>{item.name}</p>
                    <p>{item.year}</p>
                    <p>{item.uri150}</p>
                </div>
            ))}
        </div>
    )
};

export default AddFavorites;
