import React, {useState, useEffect} from 'react';
import ReservationList from "../components/Reservation/ReservationList";
import GatewayService from '../API/GatewayService';


function Reservations() {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');

    const fetchReservations = async()  =>{
        try {
            const response = await GatewayService.fetchReservations(); 
            setReservations([...response.data]);
        }catch(error){
            setError(error)
        }
    }

    useEffect(() => {
        fetchReservations();
    }, [])
    
    console.log('eservations:', reservations);

    return (
        <div className="App">
            <hr style={{margin: '15px 0'}}/>
            {error &&<h1>Произошла ошибка ${error}</h1>}
            <ReservationList reservations={reservations} />
        </div>
    );
}

export default Reservations;
