import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './UserProfile.css';

const UserProfile = () => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div>

        </div>
    );
}

export default UserProfile;