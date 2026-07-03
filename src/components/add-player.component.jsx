import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PlayerService from '../services/player.service';

const AddPlayerComponent = () => {
    // Mirroring your reference's state-toggle design using hooks
    const [submitted, setSubmitted] = useState(false);
    const [uiError, setUiError] = useState("");

    const defaultValues = {
        playerName: "",
        jerseyNumber: "",
        role: "",
        totalMatches: "",
        teamName: "",
        countryName: "",
        description: ""
    };

    const validationSchema = yup.object().shape({
        playerName: yup.string().required('Player Name is required'),
        jerseyNumber: yup.number()
            .typeError('Jersey number must be a valid number')
            .positive('Jersey Number must be a positive number')
            .required('Jersey Number is required'),
        role: yup.string()
            .oneOf(["Batsman", "Bowler", "Keeper", "All Rounder"], 'Invalid Role selected')
            .required('Role is required'),
        totalMatches: yup.number()
            .typeError('Total matches must be a valid number')
            .min(0, 'Matches cannot be negative')
            .required('Total Matches is required'),
        teamName: yup.string().required('Team Name is required'),
        countryName: yup.string().required('Country Name is required'),
        description: yup.string().max(250, 'Description cannot exceed 250 characters').optional()
    });

    const handleSubmit = (values, { resetForm }) => {
        setUiError("");
        PlayerService.create(values)
            .then((response) => {
                console.log('Player data saved:', response.data);
                setSubmitted(true); // Switches views immediately upon database confirmation
                resetForm();        // Clears data strings from internal Formik memory
            })
            .catch((err) => {
                console.error(err);
                setUiError("Failed to save profile. The registration payload contains invalid arguments.");
            });
    };

    return (
        <div className="submit-form container mt-4" style={{ maxWidth: '600px' }}>
            {/* Matches the conditional rendering logic of your reference file */}
            {submitted ? (
                <div className="text-center p-4 bg-light rounded border shadow-sm">
                    <h4 className="text-success mb-3">You submitted successfully!</h4>
                    <button className="btn btn-success px-4" onClick={() => setSubmitted(false)}>
                        Add
                    </button>
                </div>
            ) : (
                <div className="card shadow-sm border-0 bg-white">
                    <div className="card-header bg-dark text-white py-3">
                        <h4 className="mb-0 fs-5">Register Player</h4>
                    </div>
                    
                    <div className="card-body p-4">
                        {uiError && <div className="alert alert-danger shadow-sm mb-4">{uiError}</div>}

                        <Formik 
                            initialValues={defaultValues} 
                            validationSchema={validationSchema} 
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form className="row g-3">
                                    {/* Player Name */}
                                    <div className="col-12">
                                        <label htmlFor="playerName" className="form-label fw-bold small text-muted">Player Name</label>
                                        <Field 
                                            id="playerName" 
                                            type="text" 
                                            name="playerName" 
                                            placeholder="e.g. MS Dhoni" 
                                            className={`form-control ${touched.playerName && errors.playerName ? 'is-invalid' : ''}`} 
                                        />
                                        <div className="invalid-feedback"><ErrorMessage name="playerName" /></div>
                                    </div>

                                    {/* Jersey Number */}
                                    <div className="col-sm-6">
                                        <label htmlFor="jerseyNumber" className="form-label fw-bold small text-muted">Jersey Number</label>
                                        <Field 
                                            id="jerseyNumber" 
                                            type="number" 
                                            name="jerseyNumber" 
                                            placeholder="e.g. 7" 
                                            className={`form-control ${touched.jerseyNumber && errors.jerseyNumber ? 'is-invalid' : ''}`} 
                                        />
                                        <div className="invalid-feedback"><ErrorMessage name="jerseyNumber" /></div>
                                    </div>

                                    {/* Role Selection */}
                                    <div className="col-sm-6">
                                        <label htmlFor="role" className="form-label fw-bold small text-muted">Role Slot</label>
                                        <Field 
                                            as="select" 
                                            id="role" 
                                            name="role" 
                                            className={`form-select ${touched.role && errors.role ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="Batsman">Batsman</option>
                                            <option value="Bowler">Bowler</option>
                                            <option value="Keeper">Keeper</option>
                                            <option value="All Rounder">All Rounder</option>
                                        </Field>
                                        <div className="invalid-feedback"><ErrorMessage name="role" /></div>
                                    </div>

                                    {/* Total Matches */}
                                    <div className="col-sm-6">
                                        <label htmlFor="totalMatches" className="form-label fw-bold small text-muted">Total Matches</label>
                                        <Field 
                                            id="totalMatches" 
                                            type="number" 
                                            name="totalMatches" 
                                            placeholder="e.g. 350" 
                                            className={`form-control ${touched.totalMatches && errors.totalMatches ? 'is-invalid' : ''}`} 
                                        />
                                        <div className="invalid-feedback"><ErrorMessage name="totalMatches" /></div>
                                    </div>

                                    {/* Team Name */}
                                    <div className="col-sm-6">
                                        <label htmlFor="teamName" className="form-label fw-bold small text-muted">Team Name</label>
                                        <Field 
                                            id="teamName" 
                                            type="text" 
                                            name="teamName" 
                                            placeholder="e.g. CSK" 
                                            className={`form-control ${touched.teamName && errors.teamName ? 'is-invalid' : ''}`} 
                                        />
                                        <div className="invalid-feedback"><ErrorMessage name="teamName" /></div>
                                    </div>

                                    {/* Country Name */}
                                    <div className="col-12">
                                        <label htmlFor="countryName" className="form-label fw-bold small text-muted">Country</label>
                                        <Field 
                                            id="countryName" 
                                            type="text" 
                                            name="countryName" 
                                            placeholder="e.g. India" 
                                            className={`form-control ${touched.countryName && errors.countryName ? 'is-invalid' : ''}`} 
                                        />
                                        <div className="invalid-feedback"><ErrorMessage name="countryName" /></div>
                                    </div>

                                    {/* Description Textarea */}
                                    <div className="col-12">
                                        <label htmlFor="description" className="form-label fw-bold small text-muted">Short Bio Description</label>
                                        <Field 
                                            as="textarea" 
                                            id="description" 
                                            rows="3" 
                                            name="description" 
                                            placeholder="Enter milestones..." 
                                            className="form-control" 
                                        />
                                        <div className="text-danger small mt-1"><ErrorMessage name="description" /></div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="col-12 mt-4">
                                        <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddPlayerComponent;