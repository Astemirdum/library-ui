import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";

const ReservationForm = (props) => {
    const [reservation, setReservation] = useState({bookUid: props.bookUid, libraryUid: props.libraryUid, tillDate: ''})

    const addNewReservation = (e) => {
        e.preventDefault()
        console.log("reservation", reservation);
        props.create(reservation)
    }

    return (
        <form>
            <MyInput
                value={reservation.tillDate}
                onChange={e => setReservation({...reservation, tillDate: e.target.value})}
                type="text"
                placeholder="till Date"
            />
            <MyButton onClick={addNewReservation}>Make Reservation</MyButton>
        </form>
    );
};

export default ReservationForm;
