import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from 'react-router-dom';
import SpotDetail from '../SpotDetail'
import { getAllSpots } from "../../store/spot";
import './SpotBrowser.css';

const SpotList = () => {
    const spots = [];
    // const [spots, setSpots] = useState("")
    const dispatch = useDispatch();
    // const { id } = useParams();
    const spotList = useSelector(state => {
        return state.spots;
    });

    for (const key in spotList) {
        spots.push(spotList[key])
    }
    // const allSpots = Object.values(spotList)
    // console.log(spotList);
    useEffect(() => {
        dispatch(getAllSpots());
        // dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div id="spot-container">
            {/* <h1>Spots</h1> */}
            {spots.map((spot) => (
                // <p key={id}>{name}</p>
                // <a href="#">
                <Link key={spot.id} to={`/spots/${spot.id}`} target="_blank">
                    <div className="spot-post">
                        <div className="spot-preview-image">
                            {/* <i className="fa-regular fa-heart"></i> */}

                            <img src="../assets/img/d-house-preview-image.jpg" alt={spot.name} />
                        </div>

                        <div className="city-rating-container">
                            {/* <h1>{spot.name}</h1> */}
                            <p className="location">{spot.state}, {spot.city}</p>
                            <p className="rating">{spot.avgRating}</p>
                        </div>
                        <p>Distance</p>
                        <p>Booking</p>
                        <p>${spot.price} night</p>
                    </div>
                </Link>
                // </a>

            ))}
            {/* <h1>{id}</h1> */}
            <Route path="/spots/:spotId">
                <SpotDetail />
            </Route>
        </div>

    );
}
export default SpotList;