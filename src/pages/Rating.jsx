import React, {useEffect, useState} from 'react';
import GatewayService from "../API/GatewayService";
import { useAuthCtx } from '../context/AuthContext';


function Rating() {
    const [rating, setRating] = useState({})
    const [error, setError] = useState('');
    const { user } = useAuthCtx();

    const fetchRating = async () => {
        try {
            const response = await GatewayService.fetchUserRating();
            console.log('fetchRating data:', response.data);
            setRating(response.data)
        } catch(error){
            setError(error);
            console.error('error:', error)
        } 
    }

    useEffect(() => {
        fetchRating();
    }, [])

    return (
        <div className="rating-container">
            {error && <h1 className="error-message">Произошла ошибка ${error}</h1>}
            <div className="rating-content">
                <h2 className="username">{user.username}</h2>
                <div className="rating">
                    Rating: {rating.stars || 0}
                </div>
            </div>
        </div>
    );
}

export default Rating;
