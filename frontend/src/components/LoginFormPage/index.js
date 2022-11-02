import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div className="user-form-container" id='sign-up'>
            <div className="form-header">
                <h4>Log in</h4>
            </div>

            <form onSubmit={handleSubmit} className="create-user-form">
                <h2>Welcome to Airbnb</h2>
                <ul className='errors-handling'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="form-input-container">
                    <label>
                        {/* Username or Email */}
                        <input
                            type="text"
                            placeholder='Username or Email'
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                            className='form-top'
                        />
                    </label>
                    <label>
                        {/* Password */}
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='form-bottom'
                        />
                    </label>
                </div>
                <small>We’ll call or text you to confirm your number. Standard message and data rates apply. <b><a href="#">Privacy Policy</a></b></small>

                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LoginFormPage;