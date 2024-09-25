import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components-ansh/OAuth';

export default function GovSignup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/govOfficial-dashboard');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="p-5 max-w-md w-full bg-light rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold my-7 text-dark">
          Government Official Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="bg-white text-dark p-3 rounded-lg border border-middle focus:outline-none focus:ring-2 focus:ring-middle"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="bg-white text-dark p-3 rounded-lg border border-middle focus:outline-none focus:ring-2 focus:ring-middle"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="bg-white text-dark p-3 rounded-lg border border-middle focus:outline-none focus:ring-2 focus:ring-middle"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-dark text-white p-3 rounded-lg uppercase hover:bg-middle transition duration-300 disabled:bg-opacity-70"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          {/* <OAuth /> */}
        </form>
        <div className="flex justify-center gap-2 mt-5">
          <p className="text-dark">Already have an account?</p>
          <Link to="/govOfficial-signin">
            <span className="text-middle underline">Sign In</span>
          </Link>
        </div>
        <p className="text-red-600 mt-5 text-center">
          {error && 'Something went wrong!'}
        </p>
      </div>
    </div>
  );
}
