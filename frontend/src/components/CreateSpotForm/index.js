import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './CreateSpotForm.css';

const CreateSpotForm = () => {

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

        };

    };

    return (
        <div className='booking-form'>
            <form className="create-booking-form" onSubmit={handleSubmit}>

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
                    placeholder="City"
                />

                <input
                    type="text"
                    placeholder="State"
                />

                <input
                    type="text"
                    placeholder="Country"
                />

                <input
                    type="text"
                    placeholder="Country"
                />

                <input
                    type="text"
                    placeholder="Country"
                />

                <input
                    type="text"
                    placeholder="Country"
                />


            </form>
        </div>
    );
};

export default CreateSpotForm;