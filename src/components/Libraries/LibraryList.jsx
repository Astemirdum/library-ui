import React from 'react';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import LibraryItem from "./LibraryItem";

function LibraryList({libraries}) {
  if (!libraries.length) {
    return (
        <h1 style={{textAlign: 'center'}}>
            Libraries not found!
        </h1>
        )
    }
  return (
    <div>
        <h1 style={{textAlign: 'center'}}>
            {'libraries'}
        </h1>
        <TransitionGroup>
            {libraries.map((library, index) =>
                <CSSTransition
                    key={library.libraryUid}
                    timeout={500}
                    classNames="post"
                >
                    <LibraryItem number={index + 1} library={library} />
                </CSSTransition>
            )}
        </TransitionGroup>
    </div>
);

}
export default LibraryList;

