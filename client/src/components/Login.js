import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppContext } from "../AppContext";

const Login = () => {
  const {
    setIsLoggedIn,
    setErrors,
    setIsSubmitting,
    email,
    setEmail,
    password,
    setPassword,
    setUser,
  } = useContext(AppContext);

  const history = useHistory();

  const login = (values, history) => {
    return fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include", // Send cookies
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => Promise.reject(data.message));
        }
        return response.json();
      })
      .then((userData) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLoggedIn(true);
        setUser(userData);
        console.log('logged in successfully');
        history.push("/dashboard");
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      let isMounted = true;
      login(values, history)
        .then(() => {
          if (isMounted) {
            setSubmitting(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            setErrors({ submit: "Invalid email or password" });
            setSubmitting(false);
          }
        });
      return () => {
        isMounted = false;
      };
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form
        className="w-96 p-6 bg-white rounded-md shadow-md"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          {formik.errors.email && (
            <div className="text-red-500 text-xs">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          {formik.errors.password && (
            <div className="text-red-500 text-xs">{formik.errors.password}</div>
          )}
        </div>
        <div>
        <div className='flex flex-col items-center justify-center'>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full px-3 py-2 text-white bg-red-500 rounded-md hover:bg-black focus:outline-none"
          >
            Login
          </button>
          <div className='w-full border-b border-white mb-2'></div>
          <button
            onClick={() => history.push("/signup")}
            className="w-full px-3 py-2 text-white bg-black rounded-md hover:bg-white focus:outline-none"
          >
            Create New Account
          </button>
          
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
