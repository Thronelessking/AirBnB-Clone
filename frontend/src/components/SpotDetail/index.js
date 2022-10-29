import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spot';
import CreateBookingForm from '../CreateBookingForm';
import './SpotDetail.css';

const SpotDetail = () => {
    //
    const { spotId } = useParams();
    console.log(spotId)
    const spot = useSelector(state => state.spots[spotId]);

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
    }, [dispatch, spotId]);

    if (!spot) {
        return null;
    }

    return (
        <div className='spot-container'>
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
                    <h3>{spot.name} hosted by {spot.Owner.firstName}</h3>
                </div>
                <div>
                    <div className='booking-form-container'>
                        <div>
                            <h2>${spot.price} night</h2>
                        </div>
                        <div>
                            <ul>
                                <li>rating</li>
                                <li><a href="#">reviews</a></li>
                            </ul>
                        </div>
                        <CreateBookingForm />
                        <a href='#'>Report this listing</a>
                    </div>
                </div>
            </div>
            <div className='reviews-container'>

            </div>
        </div>
    );
}

export default SpotDetail;