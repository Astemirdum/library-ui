import React from 'react';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import StatsItem from "./StatsItem";

function StatsList({stats}) {
  if (!stats.length) {
    return (
        <h1 style={{textAlign: 'center'}}>
            Stats not found!
        </h1>
        )
    }
  return (
    <div>
        <h1 style={{textAlign: 'center'}}>
            {'Stats List:'}
        </h1>
        <TransitionGroup>
            {stats.map((stat, index) =>
                <CSSTransition
                    key={index}
                    timeout={500}
                    classNames="post"
                >
                    <StatsItem number={index + 1} stat={stat} />
                </CSSTransition>
            )}
        </TransitionGroup>
    </div>
);

}
export default StatsList;

