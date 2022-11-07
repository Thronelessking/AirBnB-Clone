import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createNewSpot, getAllSpots, getOneSpot, updateSpotById, deleteSpotById } from '../../store/spot';
import { getAllReviewsForSpot } from '../../store/reviews';
// import { getAllReviewsForSpot } from '../../store/reviews';
// import * as sessionActions from '../../store/session';
import ReviewBrowser from '../ReviewBrowser'
import CreateBookingForm from '../CreateBookingForm';

import './SpotDetail.css';
import BookingsList from '../BookingBrowser';


const SpotDetail = () => {
    // const [bookings, setBookings] = useState(false)
    const sessionUser = useSelector(state => state.session.user);

    const { spotId } = useParams();
    // const spotList = useSelector(state => {
    //     return state.spots;
    // });
    // const spot = spotList[spotId]
    const history = useHistory();
    const spot = useSelector(state => {
        return state.spots;
    });

    // const reviews = useSelector(state => state.reviews[spotId]);

    // const spot = useSelector(state => {
    //     return state.spots.find(spot => spot.id === spotId)
    // }
    // )
    // const spotInfo = Object.values(spot)
    // console.log(spotId, spotList)
    // console.log(sessionUser.id)
    const dispatch = useDispatch();
    //useStates

    //useEffect
    useEffect(() => {
        // dispatch(getAllSpots());
        dispatch(getOneSpot(spotId));
        // dispatch(deleteSpotById(spotId))
        // dispatch(updateSpotById(spotId))
        // dispatch(deleteBookingById())
        // setBookings(true)
    }, [dispatch, spotId]);

    // useEffect(() => {
    //     dispatch(getAllReviewsForSpot(spotId));
    // }, [dispatch, spotId]);

    if (!spot) {
        return null;
    }
    // function userPermissions(){

    // }
    const deleteSpot = (e) => {
        e.preventDefault();

        dispatch(deleteSpotById(spotId))

        history.push("/")
    };

    // const editSpot = (e) => {
    //     e.preventDefault();

    //     dispatch(updateSpotById(spotId))

    //     history.push(`/spots/${spotId}`)
    // };



    return (
        <div className='spot-container'>
            {
                sessionUser.id === spot.Owner.id &&
                <div className='user-permissions'>
                    {/* <button
                        type='submit'      
                        onClick={editSpot}
                    >Edit Spot</button> */}
                    <Link to={`/spots/${spot.id}/edit`}>Edit Spot</Link>

                    <button
                        type='submit'
                        onClick={deleteSpot}
                    >Delete Spot</button>
                </div>
            }
            <div className='spot-images'>
                <div className='main-preview-img'>
                    <img src='../assets/img/main-house-preview-image.jpg' alt='Main Image'></img>
                </div>

                <div className='four-square-home-1 box1 hdi'>
                    <img src='../assets/img/a-house-preview-image.jpg' alt='' />
                </div>
                <div className='four-square-home-2 box2 hdi'>
                    <img src='../assets/img/a-house-preview-image.jpg' alt='' />
                </div>
                <div className='four-square-home-3 box3 hdi'>
                    <img src='../assets/img/a-house-preview-image.jpg' alt='' />
                </div>
                <div className='four-square-home-4 box4 hdi'>
                    <img src='../assets/img/a-house-preview-image.jpg' alt='' />
                </div>

            </div>
            <div className='spot-details'>
                <div className='spot-info'>
                    <h2>{spot.name} hosted by {spot.Owner.firstName}</h2>
                    <p>{spot.description}</p>
                </div>

                <div className='spot-booking-form-container'>
                    <div className="spot-booking-container">
                        <h3>${spot.price} night</h3>
                        <h3><i className="fa-solid fa-star"></i> {spot.avgRating} | {spot.Reviews?.length}</h3>
                        {/* <ul>
                            <li>rating</li>
                            <li><a href="#">reviews</a></li>
                        </ul> */}
                    </div>
                    <CreateBookingForm spotId={spot.id} />
                    {/* <a href='#'>Report this listing</a> */}
                </div>

            </div>

            <ReviewBrowser spotId={spot.id} />
            <BookingsList spotId={spot.id} />
            <div className='google-maps'>
                <h3>Where you'll be</h3>
                <div></div>
                <div className='spot-description'>
                    <h3>{spot.city}, {spot.state}, {spot.country}</h3>

                </div>
            </div>

            <div className='spot-user-details'>
                <div className='spot-about-host-container'>
                    <div className='user-profile-img'>
                        <img src='' alt='' />
                    </div>
                    <div className='user-title-container'>
                        <h3>Hosted by {spot.Owner.firstName}</h3>
                    </div>
                </div>
                <div className='spot-host-stats-container'>

                </div>
            </div>

            <div className='spot-things-to-know'>

            </div>

        </div>
    );
}

export default SpotDetail;