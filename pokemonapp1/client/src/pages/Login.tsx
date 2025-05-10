import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  const handleLogin = () => {
    // Validate inputs
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    // Send login request to the server
    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Login failed');
        return response.json();
      })
      .then((data) => {
        console.log('Login successful:', data);
        // Handle successful login (e.g., save token, redirect)
      })
      .catch((error) => {
        console.error(error);
        alert('Invalid credentials. Please try again.');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;