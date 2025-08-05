import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Brain, Mail, Lock } from 'lucide-react';
import { login as loginService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginService({ email, password });
      // Update the auth context with the user data and token
      login(data.user, data.token);

      // Redirect to the page user tried to visit or home
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white pt-24">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Brain className="h-12 w-12 text-purple-300" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to InterviewPro
        </h2>
        <p className="mt-2 text-center text-sm text-purple-200">
          Or{' '}
          <Link to="/signup" className="font-medium text-blue-300 hover:text-blue-200 transition duration-300">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-indigo-900 py-8 px-4 shadow-md sm:rounded-lg sm:px-10 border border-purple-700">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-200">
                Email address
              </label>
              <div className="mt-1 relative rounded-full shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-purple-500 rounded-full leading-5 bg-indigo-800 text-white placeholder-purple-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-purple-200">
                Password
              </label>
              <div className="mt-1 relative rounded-full shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-purple-500 rounded-full leading-5 bg-indigo-800 text-white placeholder-purple-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-purple-500 rounded bg-indigo-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-purple-200">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-300 hover:text-blue-200 transition duration-300">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-indigo-900 text-purple-300">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-purple-500 rounded-full shadow-sm bg-indigo-800 text-sm font-medium text-purple-200 hover:bg-indigo-700 transition duration-300">
                Google
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-purple-500 rounded-full shadow-sm bg-indigo-800 text-sm font-medium text-purple-200 hover:bg-indigo-700 transition duration-300">
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
