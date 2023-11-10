import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        const fetchUploads = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/uploads`);
                setUploads(response.data);
            } catch (error) {
                console.error('An error occurred while fetching user uploads:', error);
            }
        };

        fetchUploads();
    }, []); // üres függőséglista azt jelenti, hogy csak a komponens mountolásakor hajtódik végre

    return (
        <div className='main-container'>
            <h1>Felhasználók által feltöltött képek:</h1>
            <div className='Allimages'>
                <div className='images'>
                    {uploads.map((upload) => (
                        <div key={upload._id}>
                            <img src={upload.img} alt={`Uploaded by ${upload.username}`} />
                            <h3>Feltöltő: {upload.username}</h3>
                            <p>Leírás: {upload.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Main;
