import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
// import OAuth from '../components-ansh/OAuth';

export default function RetailerSignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/retailer-dashboard');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
    <div className="p-5 max-w-lg w-full bg-light rounded-lg shadow-lg">
      <h1 className="text-3xl text-center font-semibold my-7 text-dark">Retailer Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 text-dark p-3 rounded-lg border border-middle focus:outline-none focus:ring-2 focus:ring-middle"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 text-dark p-3 rounded-lg border border-middle focus:outline-none focus:ring-2 focus:ring-middle"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-dark text-white p-3 rounded-lg uppercase hover:bg-middle transition duration-300 disabled:bg-opacity-70"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex justify-center gap-2 mt-5">
        <p className="text-dark">Don’t Have an account?</p>
        <Link to="/retailer-signup">
          <span className="text-middle underline">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5 text-center">
        {error ? error.message || 'Something went wrong!' : ''}
      </p>
    </div>
  </div>
  );
}
