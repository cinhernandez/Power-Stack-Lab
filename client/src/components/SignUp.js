import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';

const SignupForm = () => {
    const history = useHistory();
    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
};

    const ValidationSchema = Yup.object().shape({
        username: Yup.string()
        .min(4, 'Username must be at least 4 characters long')
        .max(20, 'Username must be less than 20 characters long')
        .required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    });

    const handleSubmit = (values, {setSubmitting}) => {
        fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        })
        .then((response) => {
            if (response.ok) {
            console.log('Registration Successful');

            history.push('/dashboard');
            } else {
            console.log('Registration Failed');
            }
        })
        .catch((error) => {
            console.log('Error: registering: ', error);
        })
        .finally(() => {
            setSubmitting(false)
        });
    
        
    };

    const formik = useFormik({
        initialValues,
        ValidationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className="max-w-md mx-auto bg-white rounded shadow p-8">
        <h1 className= "text-2x; font-bold mb-8">Sign Up</h1>
        <form onSubmit={formik.handleSubmit}>

        </form>
        </div>
    )