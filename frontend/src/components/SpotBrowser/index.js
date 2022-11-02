import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from 'react-router-dom';
import SpotDetail from '../SpotDetail'
import { getAllSpots } from "../../store/spot";
import './SpotBrowser.css';

const SpotList = () => {
    // const [spots, setSpots] = useState("")
    const dispatch = useDispatch();
    // const { id } = useParams();
    const spotList = useSelector(state => {
        return state.spots;
    });
    const allSpots = Object.values(spotList)
    // console.log(spotList);
    useEffect(() => {
        dispatch(getAllSpots());
        // dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div id="spot-container">
            {/* <h1>Spots</h1> */}
            {allSpots.map(({ id, name, city, state, price, rating, previewImage }) => (
                // <p key={id}>{name}</p>
                // <a href="#">
                <Link key={id} to={`/spots/${id}`} target="_blank">
                    <div className="spot-post">
                        <div className="spot-preview-image">
                            <i className="fa-regular fa-heart"></i>
                            <img src="#" alt="" />
                        </div>
                        <img src="#" alt="" />
                        <div className="city-rating-container">
                            <p className="location">{state}, {city}</p>
                            <p className="rating">{rating}</p>
                        </div>
                        <p>Distance</p>
                        <p>Booking</p>
                        <p>${price} night</p>
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