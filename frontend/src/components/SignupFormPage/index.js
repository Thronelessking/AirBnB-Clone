import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="user-form-container" id='sign-up'>
            <div className="form-header">
                <h4>Sign-up</h4>
            </div>

            <form onSubmit={handleSubmit} className="create-user-form">
                <h2>Welcome to Airbnb</h2>
                <ul className='errors-handling'>
                    {errors.map((error, idx) => <li key={idx}><i class="fa-solid fa-circle-exclamation"></i> {error}</li>)}
                </ul>
                <div className="form-input-container">
                    <label>
                        {/* First Name */}
                        <input
                            placeholder="First Name"
                            type="text"
                            className="form-top"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        {/* Last Name */}
                        <input
                            placeholder="Last Name"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        {/* Email */}
                        <input
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        {/* Username */}
                        <input
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        {/* Password */}
                        <input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        {/* Confirm Password */}
                        <input
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="form-bottom"
                        />
                    </label>

                </div>
                <small>We’ll call or text you to confirm your number. Standard message and data rates apply. <b><a href="#">Privacy Policy</a></b></small>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormPage;