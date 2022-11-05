import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from 'react-router-dom';
import { getAllReviewsForSpot } from "../../store/reviews";

import './ReviewBrowser.css';

const ReviewsList = ({ spotId }) => {
    // const sessionUser = useSelector(state => state.session.user);
    const reviews = [];

    const dispatch = useDispatch();
    // const { spotId } = useParams();

    const reviewsList = useSelector(state => {
        // console.log(state.reviews)
        return state.reviews;
    });

    for (const key in reviewsList) {
        reviews.push(reviewsList[key])
    }
    // console.log(reviewsList);

    // const allReviews = Object.values(reviewsList);
    // console.log(allReviews);
    // review = useSelector(state => state.reviews[reviewId]);


    useEffect(() => {
        dispatch(getAllReviewsForSpot(spotId));
    }, [dispatch]);

    function parseDate(date) {
        date = new Date(date)
        date = date.toLocaleDateString([], {
            month: 'long',
            year: 'numeric'
        });
        return date
    }

    return (
        <div className="reviews-container">
            <h2>What guests are saying about their experience...</h2>
            {/* {allReviews.map(({ id, User, content, stars, createdAt }) => ( */}
            {reviews.map((review) => (

                <div key={review.id}>
                    <div className="user-profile-img">
                        <img src="../../assets/img/user-profile-example-img.jpg" alt={review.User.firstName} />

                    </div>
                    <div className="users-review-container">
                        <h3>{review.User.firstName}</h3>
                        <p>{parseDate(review.createdAt)}</p>
                        <p>{review.content}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ReviewsList;