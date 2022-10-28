import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spot';
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
        <div className='spot-detail'>
            <div className='spot-images'>
                <div className='main-preview-img'>
                    <img src='../assets/img/main-house-preview-image.jpg' alt='Main Image'></img>
                </div>
                <div className='four-square-home'>
                    <div className='box1 hdi'>
                        <img src='../assets/img/a-house-preview-image.jpg' alt='' />
                    </div>
                    <div className='box2 hdi'>
                        <img src='../assets/img/a-house-preview-image.jpg' alt='' />
                    </div>
                    <div className='box3 hdi'>
                        <img src='../assets/img/a-house-preview-image.jpg' alt='' />
                    </div>
                    <div className='box4 hdi'>
                        <img src='../assets/img/a-house-preview-image.jpg' alt='' />
                    </div>
                </div>
            </div>
            <div className='spot-details'>
                <div className='spot-info'>
                    <h3>{spot.name} hosted by {spot.Owner.firstName}</h3>
                </div>
            </div>
        </div>
    );
}

export default SpotDetail;