<header>
    <div>
        <NavLink exact to="/"><img src="../../assets/img/airbnb_logo.svg.png" alt="Airbnb" /></NavLink>
    </div>
    <div>

    </div>
    <div>
        <nav>
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </nav>
    </div>
</header>