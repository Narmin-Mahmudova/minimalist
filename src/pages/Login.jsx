import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); 
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email.trim());
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = form;

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address (e.g. user@example.com).');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const users = getUsers();
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setError('An account with this email already exists.');
      return;
    }

    const newUser = { name: name.trim(), email: email.trim(), password };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    localStorage.setItem('currentUser', JSON.stringify({ name: newUser.name, email: newUser.email }));
    window.dispatchEvent(new Event('userChanged'));
    navigate('/');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const users = getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      setError('Incorrect email or password.');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
    window.dispatchEvent(new Event('userChanged'));
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f8f8f8] flex items-start justify-center">
      <div className="w-full max-w-[420px] bg-white p-8 md:p-10 rounded-lg border border-gray-200 mx-4">
        <h1 className="text-2xl font-bold text-ink mb-1 text-center">
          {mode === 'login' ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          {mode === 'login' ? 'Log in to continue shopping' : 'Sign up to save your favorites and orders'}
        </p>

        <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4" noValidate>
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:border-ink transition-colors"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:border-ink transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:border-ink transition-colors"
              placeholder="••••••••"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:border-ink transition-colors"
                placeholder="••••••••"
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-ink text-white rounded text-sm font-semibold transition-colors hover:bg-[#333]"
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setForm({ name: '', email: '', password: '', confirmPassword: '' }); }}
            className="text-ink font-semibold underline"
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>

        <Link to="/" className="block text-center text-xs text-gray-400 mt-6 hover:text-ink transition-colors">
          Continue browsing without an account
        </Link>
      </div>
    </div>
  );
}

export default Login;