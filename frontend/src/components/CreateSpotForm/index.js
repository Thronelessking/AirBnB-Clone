import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewSpot } from '../../store/spot';
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
    const [errors, setErrors] = useState([])

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
    const validate = () => {
        const errors = [];
        if (!name) errors.push('Please provide a name for the experience.');
        if (!address) errors.push('Please provide an address.');
        if (!city) errors.push('Please provide a city.');
        if (!state) errors.push('Please provide a state.');
        if (!country) errors.push('Please provide a country.');
        if (!lat) errors.push('Please provide a latitude.');
        if (!lng) errors.push('Please provide a longitude.');
        if (!description) errors.push('Please provide a description.');
        if (!price) errors.push('Please provide a price.');
        return errors
    }


    // useEffect(() => {
    //     dispatch()
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const errors = validate();

        if (errors.length > 0) return setErrors(errors);

        const spot = {
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

        return dispatch(createNewSpot(spot))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

    };

    // let createdSpot;

    // try {
    //     // createdSpot = await dispatch((payload))
    // } catch (error) {

    // }

    return (
        <div className='booking-form-container'>
            <div className="form-header">
                <h4>Host a new experience</h4>
            </div>
            <ul className='errors-handling'>
                {errors.map((error, idx) => <li key={idx}>*{error}*</li>)}
            </ul>
            <form className="create-booking-form" onSubmit={handleSubmit}>
                <div className="form-input-container">
                    <input
                        type="text"
                        placeholder="Name"
                        // required
                        className="form-top"
                        value={name}
                        onChange={updateName}
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        // min="1"
                        // required
                        value={address}
                        onChange={updateAddress}
                    // {/* <ErrorMessage label={"Number"} message={errorMessages.number} /> */}
                    />

                    <input
                        type="text"
                        placeholder="Price"
                        // required
                        value={price}
                        onChange={updatePrice}
                    />

                    <input
                        type="text"
                        placeholder="City"
                        // required
                        value={city}
                        onChange={updateCity}
                    />

                    <input
                        type="text"
                        placeholder="State"
                        // required
                        value={state}
                        onChange={updateState}
                    />

                    <input
                        type="text"
                        placeholder="Country"
                        // required
                        value={country}
                        onChange={updateCountry}
                    />

                    <input
                        type="text"
                        placeholder="Latitude"
                        // required
                        value={lat}
                        onChange={updateLat}
                    />

                    <input
                        type="text"
                        placeholder="Longitude"
                        // required
                        value={lng}
                        onChange={updateLng}
                    />

                    <textarea
                        placeholder="Description"
                        // required
                        className="form-bottom"
                        value={description}
                        onChange={updateDescription}
                    ></textarea>
                </div>
                <button type="submit">Create Spot</button>
            </form >
        </div >
    );
};

export default CreateSpotForm;