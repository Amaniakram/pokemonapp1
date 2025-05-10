import React, { useState} from "react";
import {  useNavigate } from "react-router-dom";


const PokemonRegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-200 via-red-100 to-blue-100 px-4">
      {/* Pokémon Logo */}
      <div className="flex items-center mb-6">
        <img
          src="/pokemon-logo.png"
          alt="Pokémon Logo"
          className="h-24 w-auto"
        />
      </div>
  
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-1 text-yellow-600">Become a Pokémon Trainer!</h2>
        <p className="text-sm text-gray-700 mb-6">
          Create your account to catch, collect, and train your favorite Pokémon.
        </p>
  
        <div className="text-left mb-4">
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            placeholder="AshKetchum"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
  
        <div className="text-left mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="ash@pokemail.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
  
        <div className="text-left mb-4">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
  
        <div className="text-left mb-6">
          <label className="block font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
  
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
  
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded font-bold transition duration-300 hover:bg-yellow-600"
        >
          Register
        </button>
  
        <p className="text-sm text-gray-600 mt-4">
          Already a trainer?
        </p>
      </form>
    </div>
  );
}