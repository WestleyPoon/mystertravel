import React from 'react';
import {formatDate} from '../../helper';

const TripList = (props) => {
    const {trips_id, trips_name, start, end } = props.item;
    const url = `https://www.mystertravel.com/trip/1/${start.split(" ")[0]}/${trips_name.split(" ").join("-")}/${trips_id}`;

    return (
        <div  className="previous-trip">
        <a href={url}>
        <div className="trip-date">{formatDate(start).slice(4)} to {formatDate(end).slice(4)}</div>
        <div className="trip-name">{trips_name}</div>
        </a>
    </div>
    )
}

export default TripList;