import React from 'react';
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/MyModal/MyModal";
import ReservationForm from "../Reservation/ReservationForm"
import { useState } from 'react';

    const BookItem = (props) => {    
    const [modal, setModal] = useState(false);
    
    const makeReservation = (reservationData) => {
        props.makeReservation(reservationData)
        setModal(false)
    }
    return (
        <div className="post">
            <div className="post__content">
                <strong>ID: {props.book.bookUid}</strong>
                <div>Name: {props.book.name}</div>
                <div>Author: {props.book.author}</div>
                <div>Genre: {props.book.genre}</div>
                <div>Condition: {props.book.condition}</div>
                <div>Available Count: {props.book.availableCount}</div>
            </div>
            <div className="post__btns">
                <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                    make reservation
                </MyButton>
                <MyModal visible={modal} setVisible={setModal}>
                    <ReservationForm  create={makeReservation} bookUid={props.book.bookUid} libraryUid={props.libraryUid} />
                </MyModal>
            </div>
        </div>
    );
};

export default BookItem;
