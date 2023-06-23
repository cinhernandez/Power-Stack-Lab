import React, { useState } from "react";
import { useHistory } from "react-router-dom"; 



const Login = ({ setIsLoggedIn }) => { // Receive setIsLoggedIn function as a prop
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(values);
    setErrors(formErrors);
    setIsSubmitting(true);

    if (Object.keys(formErrors).length === 0) {
      console.log("Submitting login request with values:", values);
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          console.log("Received response:", response);
          if (response.ok) {
            console.log("Login successful");
            setIsLoggedIn(true);
            history.push("/dashboard");
          } else {
            console.log("Login failed");
          }
        })
        .catch((error) => {
          console.log("Error logging in:", error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      console.log("Form validation errors:", formErrors);
    }
  };

  const validateForm = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form className="w-96 p-6 bg-white rounded-md shadow-md" onSubmit={handleSubmit}>
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
            Email
          </label>
          <input 
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          {errors.email && (
            <div className="text-red-500 text-xs">{errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
            Password
          </label>
          <input 
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <div className="text-red-500 text-xs">{errors.password}</div>
          )}
        </div>
        <div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
