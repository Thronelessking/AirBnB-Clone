import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from 'react-router-dom';
import { getAllReviewsForSpot } from "../../store/reviews";

import './ReviewBrowser.css';

const ReviewsList = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const reviewsList = useSelector(state => {
        console.log(state.reviews)
        return state.reviews;
    });
    console.log(reviewsList);

    const allReviews = Object.values(reviewsList);
    console.log(allReviews);

    useEffect(() => {
        dispatch(getAllReviewsForSpot(spotId));
    }, [dispatch]);

    return (
        <div className="reviews-container">
            {allReviews.map(({ id, User, content, stars, createdAt }) => (
                <div key={id}>
                    <div className="user-profile-img">
                        <img src="../../assets/img/user-profile-example-img.jpg" alt={User.firstName} />
                    </div>
                    <div className="users-review-container">
                        {createdAt}
                        {content}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ReviewsList;