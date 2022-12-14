import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spot';
import { deleteSpotById } from '../../store/spot';
import { getAllReviewsForSpot } from '../../store/reviews';
// import { getAllReviewsForSpot } from '../../store/reviews';
// import * as sessionActions from '../../store/session';
import ReviewBrowser from '../ReviewBrowser'
import CreateBookingForm from '../CreateBookingForm';

import './SpotDetail.css';
import BookingsList from '../BookingBrowser';

const SpotDetail = ({ spot }) => {

    const sessionUser = useSelector(state => state.session.user);

    const { spotId } = useParams();
    const history = useHistory();
    spot = useSelector(state => state.spots[spotId]);

    // const reviews = useSelector(state => state.reviews[spotId]);

    // const spot = useSelector(state => {
    //     return state.spots.find(spot => spot.id === spotId)
    // }
    // )
    // const spotInfo = Object.values(spot)
    console.log(spot)
    const dispatch = useDispatch();
    //useStates

    //useEffect
    useEffect(() => {
        dispatch(getOneSpot(spotId));
        // dispatch(deleteSpotById(spotId))
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

        history.push("/spots")
    };


    return (
        <div className='spot-container'>
            {
                sessionUser.id === spot.Owner.id &&
                <div className='user-permissions'>
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
                {
                    sessionUser.id !== spot.Owner.id &&
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


                    </div>
                }

            </div>

            <ReviewBrowser spotId={spot.id} />

            {
                sessionUser.id !== spot.Owner.id &&
                <BookingsList spotId={spot.id} />
            }

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