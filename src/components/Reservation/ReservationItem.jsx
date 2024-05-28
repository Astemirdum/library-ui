import React from 'react';
import MyButton from "../UI/button/MyButton";
import ReservationReturnForm from "./ReservationReturnForm";
import MyModal from "../UI/MyModal/MyModal";
import { useState } from 'react';
import '../../styles/App.css';

const ReservationItem = (props) => {

    const [modal, setModal] = useState(false);
    
    const returnReservation = (reservationUid, returnData)=> {
        props.returnReservation(reservationUid, returnData)
        setModal(false)
    }

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.reservation.reservationUid} - {props.reservation.status} - {props.reservation.tillDate} </strong>
                <div>
                    <p>Library UID: {props.reservation.library.libraryUid}</p>
                    <p>Library Name: {props.reservation.library.name}</p>
                </div>
                <div>
                    <p>Book Name: {props.reservation.book.bookUid}</p>
                    <p>Book Name: {props.reservation.book.name}</p>
                </div>


            </div>
            <div className="post__btns">
                <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                    return reservation
                </MyButton>
                <MyModal visible={modal} setVisible={setModal}>
                    <ReservationReturnForm reservationUid={props.reservation.reservationUid} returnReservation={returnReservation}/>
                </MyModal>
            </div>
        </div>
    );
};

export default ReservationItem;
