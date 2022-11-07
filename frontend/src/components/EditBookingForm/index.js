import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOneSpot } from '../../store/spot';
import './EditBookingForm.css';

const EditBookingForm = ({ spotId }) => {

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
                <button type="submit">Edit Spot</button>
            </form >
        </div >
    )
}

export default EditBookingForm;