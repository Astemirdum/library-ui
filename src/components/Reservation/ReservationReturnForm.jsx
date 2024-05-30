import React, {useState} from 'react';
import MyButton from "../UI/button/MyButton";
import MySelect from "../UI/select/MySelect";

const ReservationReturnForm = (props) => {
    const [reservation, setReservation] = useState({reservationUid: props.reservationUid, condition: '', date: ''})

    const returnReservation = (e) => {
        e.preventDefault();
        const date = new Date(Date.now()).toISOString().slice(0, 10)

        const newReservation = {...reservation, date: date}
        props.returnReservation(props.reservationUid, newReservation)
    }

    return (
        <form>
            <MySelect
                value={reservation.condition}
                onChange={value => setReservation({...reservation, condition: value})}
                // defaultValue="EXCELLENT"
                options={[
                    {value: 'EXCELLENT', name: 'EXCELLENT'},
                    {value: 'GOOD', name: 'GOOD'},
                    {value: 'BAD', name: 'BAD'}
                ]}
            />
            <MyButton onClick={returnReservation}>Return Reservation</MyButton>
        </form>
        
    );
};

export default ReservationReturnForm;
