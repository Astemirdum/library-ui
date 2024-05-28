import React from 'react';
import './StatsItem.css';

const StatsItem = ({stat}) => {
    return (
        <div className="post">
            <div className="stats-item__content">
                <h3 className="username">{stat.username}</h3>
                <p>Rating: {stat.rating}</p>
                <p>Reservations Count: {stat.cnt_reserv}</p>
                <p>Libraries Count: {stat.cnt_libs}</p>
                <p>Books Count: {stat.cnt_books}</p>
            </div>
        </div>
    );
};

export default StatsItem;
