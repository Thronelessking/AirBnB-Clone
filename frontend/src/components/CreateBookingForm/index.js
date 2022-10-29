import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './CreateBookingForm.css';

const CreateBookingForm = () => {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const updateStartDate = (e) => setEndDate(e.target.value)
    const updateEndDate = (e) => setEndDate(e.target.value)

    useEffect(() => {

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {

        };


        // let createdPokemon;

        // try {
        //     createdPokemon = await dispatch(createPokemon(payload));
        // } catch (error) {
        //     if (error instanceof ValidationError) setErrorMessages(error.errors);
        //     // If error is not a ValidationError, add slice at the end to remove extra
        //     // "Error: "
        //     else setErrorMessages({ overall: error.toString().slice(7) })
        // }
        // //!!END
        // if (createdPokemon) {
        //     //!!START SILENT
        //     setErrorMessages({});
        //     //!!END
        //     history.push(`/pokemon/${createdPokemon.id}`);
        //     hideForm();
        // }
    };

    return (
        <div className='booking-form'>
            <form>
                <input
                    type="number"
                    placeholder="Number"
                    min="1"
                    required
                />

                {/* <ErrorMessage label={"Number"} message={errorMessages.number} /> */}

            </form>
        </div>
    );
};

export default CreateBookingForm;