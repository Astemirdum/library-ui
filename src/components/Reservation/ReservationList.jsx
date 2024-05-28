import React from 'react';
import ReservationItem from "./ReservationItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import GatewayService from '../../API/GatewayService';

const ReservationList = ({reservations}) => {

    if (!reservations.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Reservations not found!
            </h1>
        )
    }
    
    async function returnReservation(reservationUid, reservationData) {
        try {
            await GatewayService.returnReservation(reservationUid, reservationData);
        }catch(error){  
            console.error('returnReservation error:', error)
        }
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {'Reservations List'}
            </h1>
            <TransitionGroup>
                {reservations.map((reservation, index) =>
                    <CSSTransition
                        key={reservation.reservationUid}
                        timeout={500}
                        classNames="post">
                        <ReservationItem number={index + 1} reservation={reservation} returnReservation={returnReservation} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default ReservationList;
