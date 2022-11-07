import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateBooking, getOneBooking } from '../../store/bookings'
import './EditBookingForm.css';

const EditBookingForm = ({ spotId }) => {
    const dispatch = useDispatch();
    const { bookingId } = useParams();
    const booking = useSelector(getOneBooking(bookingId))
    // const { spotId } = useParams();
    console.log("From Create Booking Form " + spotId)
    const [startDate, setStartDate] = useState(booking.startDate);
    const [endDate, setEndDate] = useState(booking.endDate);
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

        let createdBooking = dispatch(updateBooking(bookingId))
            .catch(async (createdBooking) => {
                const data = await createdBooking.json();
                console.log(data)
                if (data && data.errors) setErrors(data.errors);
                if (data.statusCode === 403) setErrors([data.message])
                setEndDate("")
                setStartDate("")

            })
    };

    return (
        <div className='booking-form'>
            <h1>Update Booking</h1>
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
}

export default EditBookingForm;