import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { validateUsername, validatePassword } from '../utils/validation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    setErrors({
      username: usernameError,
      password: passwordError,
    });
    
    if (usernameError || passwordError) {
        return;
    }
       
    console.log("Submitting:", username, password);

    try {
        const data = await loginUser(username, password);
        setMessage("Login successful");
        localStorage.setItem('token', data.token);
        console.log("Login Submit");
        // window.location.href = '/dashboard';
    } catch (error) {
        console.log("Login Failed");
        setMessage(error.message || "Login failed");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} data-testid="login-form">
          <h1>Login</h1>
          <div>
            <input type="text" placeholder='Username' data-testid="username-input" value={username} onChange={(e) => setUsername(e.target.value)}/>
            {errors.username && (
                <p data-testid="username-error">
                {errors.username}
                </p>
            )}
          </div>
          <div>
            <input type="password" placeholder='Password' data-testid="password-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {errors.password && (
                <p data-testid="password-error">
                {errors.password}
                </p>
            )}
          </div>
          <button type='submit' data-testid="login-button" > Login </button>
          {message && (
            <p data-testid="login-message" className="message">
                {message}
            </p>
          )}
        </form>
      </div>
    </>
  )
}
