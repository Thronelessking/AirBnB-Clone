import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from 'react-router-dom';

const SpotIndexItem = ({ spot }) => {
    return (
        <div id="spot-container">

            <Link key={spot.id} to={`/spots/${spot.id}`} target="_blank">
                <div className="spot-post">
                    <div className="spot-preview-image">
                        <i className="fa-regular fa-heart"></i>

                        <img src="#" alt="" />
                    </div>
                    <img src="#" alt="" />
                    <div className="city-rating-container">
                        <h1>{spot.Owner.firstName}</h1>
                        <p className="location">{spot.state}, {spot.city}</p>
                        <p className="rating">{spot.avgRating}</p>
                    </div>
                    <p>Distance</p>
                    <p>Booking</p>
                    <p>${spot.price} night</p>
                </div>
            </Link>

        </div>

    );
}

export default SpotIndexItem;