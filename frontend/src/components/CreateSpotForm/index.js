import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './CreateSpotForm.css';

const CreateSpotForm = () => {
    const dispatch = useDispatch();

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    // We may have to remove rating and make a join table between Spots and Reviews like SpotImages



    useEffect(() => {

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        };

    };

    let createdSpot;

    try {
        // createdSpot = await dispatch((payload))
    } catch (error) {

    }

    return (
        <div className='booking-form'>
            <form className="create-booking-form" onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={updateName}
                />

                <input
                    type="text"
                    placeholder="Address"
                    min="1"
                    required
                    value={address}
                    onChange={updateAddress}
                // {/* <ErrorMessage label={"Number"} message={errorMessages.number} /> */}
                />

                <input
                    type="text"
                    placeholder="Price"
                    required
                    value={price}
                    onChange={updatePrice}
                />

                <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={updateCity}
                />

                <input
                    type="text"
                    placeholder="State"
                    required
                    value={state}
                    onChange={updateState}
                />

                <input
                    type="text"
                    placeholder="Country"
                    required
                    value={country}
                    onChange={updateCountry}
                />

                <input
                    type="text"
                    placeholder="Latitude"
                    required
                    value={lat}
                    onChange={updateLat}
                />

                <input
                    type="text"
                    placeholder="Longitude"
                    required
                    value={lng}
                    onChange={updateLng}
                />

                <button type="submit">Create Spot</button>
            </form>
        </div>
    );
};

export default CreateSpotForm;