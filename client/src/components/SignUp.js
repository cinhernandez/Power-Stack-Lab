import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik} from "formik";

const SignUp = () => {
//   const history = useHistory();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

  const handleSubmit = (values, { setSubmitting}) => {
        fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        })
        .then((response) => {
            if (response.ok) {
                console.log('Registration successful');
            } else {
                console.log('Registration failed');
            }
        })
        .catch((error) => {
            console.log('Error registration:', error);
        })
        .finally(() => {
            setSubmitting(false);
        });
   
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
});

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
      <form className="w-96 p-6 bg-white rounded-md shadow-md" onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            </label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username && (
                <div>{formik.errors.username}</div>
            )}
        </div>
        <div>
          <label>
            Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.email}
            />
            {formik.errors.email && (
                <div>{formik.errors.email}</div>
            )}
        </div>
        <div>
          <label>
            Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.password}
            />
            {formik.errors.password && (
                <div>{formik.errors.password}</div>
            )}
        </div>
        <div>
          <label>
            Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.confirmPassword}
            />
            {formik.errors.confirmPassword && (
                <div>{formik.errors.confirmPassword}</div>
            )}
        </div>
        <button
            type="submit"
            disabled={formik.isSubmitting}>
            Sign Up
            </button>
      </form>
    </div>
  );
}

export default SignUp;
