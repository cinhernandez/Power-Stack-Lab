import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik} from "formik";

const SignUp = () => {
  const history = useHistory();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

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

  const handleSubmit = (values) => {
    formik.setSubmitting(true);
        fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(values),
        credentials: 'include',
        })
        .then((response) => {
          if (response.ok) {
            console.log('Registration successful');
            history.push('/dashboard');
          } else {
            console.log('Registration failed');
          }
        })
        .catch((error) => {
            console.log('Error registration:', error);
        })
        .finally(() => {
            formik.setSubmitting(false);
        });
   
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
});

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
    <form className="w-96 p-6 bg-white rounded-md shadow-md" onSubmit={formik.handleSubmit}>
    <h2 className="mb-6 text-2xl font-bold text-center"> Sign Up</h2>
        <div className="mb-4">
        <label htmlFor="username" className="block mb-2 font-semibold">
            Username:
          </label>
          <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
            />
            {formik.errors.username && (
                <div className="text-red-500">{formik.errors.username}</div>
            )}
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold">
            Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
            />
            {formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
            )}
            </div>
            <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
            />
            {formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
            )}
            </div>
            <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 font-semibold">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
            />
            {formik.errors.confirmPassword && (
                <div className="text-red-500">{formik.errors.confirmPassword}</div>
            )}
            </div>
            <div className='flex flex-col items-center justify-center'></div>
            <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-black text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={formik.isSubmitting}>
            Sign Up
            </button>
            <div className='w-full border-b border-white mb-2'></div>
            <button
            onClick={() => history.push("/login")}
            className="w-full px-3 py-2 text-white bg-black rounded-md hover:bg-white focus:outline-none"
          >
            Already have an account?  Login
          </button>
        </form>
        </div>
  );
}

export default SignUp;
