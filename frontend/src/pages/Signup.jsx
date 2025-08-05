import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setError('');
      setLoading(true);

      try {
        const { confirmPassword, ...registerData } = formData;
        await register(registerData);
        navigate("/signin");
      } catch (err) {
        setError(err.message || 'Failed to create account');
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white pt-24 pb-16">
      <div className="max-w-md mx-auto p-6 bg-indigo-900 rounded-xl shadow-md border border-purple-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-300">Create an Account</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-purple-200 text-sm font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              className={`w-full px-3 py-2 rounded-full bg-indigo-800 text-white border border-purple-500 focus:outline-none focus:border-blue-400 transition duration-300 ${errors.firstName ? 'border-red-500' : ''}`}
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-purple-200 text-sm font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              className={`w-full px-3 py-2 rounded-full bg-indigo-800 text-white border border-purple-500 focus:outline-none focus:border-blue-400 transition duration-300 ${errors.lastName ? 'border-red-500' : ''}`}
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-purple-200 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full px-3 py-2 rounded-full bg-indigo-800 text-white border border-purple-500 focus:outline-none focus:border-blue-400 transition duration-300 ${errors.email ? 'border-red-500' : ''}`}
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-purple-200 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`w-full px-3 py-2 rounded-full bg-indigo-800 text-white border border-purple-500 focus:outline-none focus:border-blue-400 transition duration-300 ${errors.password ? 'border-red-500' : ''}`}
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-purple-200 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className={`w-full px-3 py-2 rounded-full bg-indigo-800 text-white border border-purple-500 focus:outline-none focus:border-blue-400 transition duration-300 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input id="remember" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded bg-indigo-800" />
              <label htmlFor="remember" className="ml-2 block text-sm text-purple-200">
                I agree to the Terms and Privacy Policy
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-purple-200">
            Already have an account? <Link to="/signin" className="text-blue-300 hover:text-blue-200 transition duration-300">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
