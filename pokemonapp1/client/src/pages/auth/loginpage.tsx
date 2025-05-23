import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // for redirection after login

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage after successful login
        localStorage.setItem("authToken", data.token);
        // Redirect user to the welcome page or dashboard
        navigate("/welcome");
      } else {
        // Show error message if the login failed
        setError(data.message || "Invalid login credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Logo */}
      <div className="flex items-center mb-6">
        <img src="/Adopto_Logo.svg" alt="Adopto Logo" className="h-20 w-50 mr-2" />
      </div>

      {/* Form Container */}
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-white text-center">
        <h2 className="text-xl font-bold mb-1">Welcome Back, Trainer!</h2>
        <p className="text-sm text-gray-700 mb-6">Let’s get you logged in to your Pokémon Trainer profile</p>

        {/* Username Field */}
        <div className="text-left mb-4">
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />
        </div>

        {/* Password Field */}
        <div className="text-left mb-6">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded font-semibold transition duration-300 hover:bg-purple-500"
        >
          Login
        </button>

        {/* Signup Link */}
        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-600 font-medium underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
