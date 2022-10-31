import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";

import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />

        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/new">New</NavLink>
            </>
        );
    }

    return (
        // <ul>
        //     <li>
        //         <NavLink exact to="/">Home</NavLink>
        //         {isLoaded && sessionLinks}
        //     </li>
        // </ul>
        <div id="header-wrapper">
            <header>
                <div className="container">
                    <div className="logo">
                        <NavLink exact to="/"><img src="../../assets/img/airbnb_logo.svg.png" alt="Airbnb" /></NavLink>
                    </div>
                    <div>

                    </div>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    {isLoaded && sessionLinks}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    )

}

export default Navigation;