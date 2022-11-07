import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { createNewBooking } from '../../store/bookings';
import './CreateBookingForm.css';

const CreateBookingForm = ({ spotId }) => {
    const dispatch = useDispatch();

    // const { spotId } = useParams();
    // console.log("From Create Booking Form " + spotId)
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState([])

    const updateStartDate = (e) => setStartDate(e.target.value)
    const updateEndDate = (e) => setEndDate(e.target.value)

    useEffect(() => {

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        // const errors = validate();

        if (errors.length > 0) return setErrors(errors);
        const newBooking = {
            startDate, endDate
        };

        dispatch(createNewBooking(newBooking, spotId))
            .catch(async (createdBooking) => {
                const data = await createdBooking.json();
                console.log(data)
                if (data && data.errors) setErrors(data.errors);
                if (data.statusCode === 403) setErrors([data.message])
                setEndDate("")
                setStartDate("")
            })
        return createNewBooking
    };

    return (
        <div className='booking-form'>
            <ul className='errors-handling'>
                {errors.map((error, idx) => <li key={idx}>*{error}*</li>)}
            </ul>
            <form className="book-experience" onSubmit={handleSubmit}>
                <div className="form-input-container">
                    <input
                        type="date"
                        placeholder="Start Date"
                        required
                        className='date-input form-top'
                        value={startDate}
                        onChange={updateStartDate}
                    />
                    <input
                        type="date"
                        placeholder="End Date"
                        required
                        className='date-input form-bottom'
                        value={endDate}
                        onChange={updateEndDate}
                    />
                </div>
                {/* <ErrorMessage label={"Number"} message={errorMessages.number} /> */}
                <button type="submit">Reserve Spot</button>
            </form>
        </div>
    );
};

export default CreateBookingForm;