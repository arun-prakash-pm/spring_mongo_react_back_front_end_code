import "../css/Login.css";
import React, { useState } from 'react';


const Login = () => {
  const [mailId, setMailId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload

    const loginData = {
      mailId: mailId,
      password: password
    };

    fetch('http://localhost:8080/api/panel_user/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    })
    .then((response) => {
        if (!response.ok) throw new Error('Login failed');
        return response.json();
      })
    .then((data) => {
        console.log('Login successful:', data);
        localStorage.setItem('token',data.token)
        console.log(localStorage.getItem('token'))
        console.log(localStorage.getItem('token'))
      })
    .catch((error) => {
        console.error('Error:',error);
      });
  };

  return (
    <div id="loginForm">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Mail Id"
          value={mailId}
          onChange={(e) => setMailId(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" id="button-st">LogIn</button>
      </form>
    </div>
  );
};

export default Login;
