import React from 'react';
import BookItem from "./BookItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import GatewayService from '../../API/GatewayService';

function BookList({libraryUid, books}) {
  if (!books.length) {
    return (
        <h1 style={{textAlign: 'center'}}>
            Books not found!
        </h1>
    )
    }
  async function makeReservation(reservationData) {
    try {
        const res = await GatewayService.makeReservation(reservationData);
        console.log('makeReservation data:', res.data);
        return res.data;
    }catch(error){
        console.error('makeReservation error:', error)
    }
  }

  return (
    <div>
        <h1 style={{textAlign: 'center'}}>
            {`Books in ${libraryUid} Library`}
        </h1>
        <TransitionGroup>
            {books.map((book, index) =>
                <CSSTransition
                    key={book.bookUid}
                    timeout={500}
                    classNames="post"
                >
                    <BookItem makeReservation={makeReservation} number={index + 1} book={book} libraryUid={libraryUid} />
                </CSSTransition>
            )}
        </TransitionGroup>
    </div>
);

}
export default BookList;

