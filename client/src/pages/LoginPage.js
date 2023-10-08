import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth'; // Import your AuthService

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Hook for navigation

  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      if (data.login.token) {
        // Store the token in local storage using AuthService
        Auth.login(data.login.token);

        // Use navigate to navigate to a new route
        navigate('/profile');
      }
    } catch (e) {
      console.error(e);
    }

    // Clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default Login;
