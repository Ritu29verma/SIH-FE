import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components-ansh/OAuth';
import { toast } from "react-toastify";
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
      setLoading(false);
      setError(false);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    if (res.ok && data.success) {
      toast.success(data.message);
      navigate("/govOfficial-dashboard"); 
    } else {
      toast.error("Registration failed. Please try again.");
    }
  } catch (error) {
    toast.error("Registration failed. Please try again.");
    console.error("There was an error registering!", error);
  }
 
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="p-5 max-w-md w-full bg-light rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold my-7 text-dark">
          Government Official Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       <div>
       <label htmlFor="username" className="block text-sm font-medium text-gray-700 ">
                Enter Your Username
              </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="bg-white text-dark p-3 min-w-full rounded-lg border border-middle focus:outline-none focus:ring-2 focus:ring-middle"
            onChange={handleChange}
          />
       </div>
         <div>
         <label htmlFor="email" className="block text-sm font-medium text-gray-700 ">
                Enter Your Email
              </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="bg-white text-dark p-3 min-w-full rounded-lg border border-middle focus:outline-none focus:ring-2 focus:ring-middle"
            onChange={handleChange}
          />
         </div>
         <div>
         <label htmlFor="password" className="block text-sm font-medium text-gray-700 ">
                Enter Your Password
              </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="bg-white text-dark p-3 min-w-full rounded-lg border border-middle focus:outline-none focus:ring-2 focus:ring-middle"
            onChange={handleChange}
          />
         </div>
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
       
      </div>
    </div>
  );
}
