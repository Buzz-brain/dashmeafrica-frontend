// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import axios from 'axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsSubmitting(true);

//     try {
//       const response = await axios.post('https://dashmeafrica-backend.vercel.app/api/users/login', {
//         email,
//         password,
//       });

//       // Save token to local storage
//       localStorage.setItem('token', response.data.token);
//       {console.log(data)}
//       // localStorage.setItem('username', user.username);

//       alert('Login Successful');
//       // Navigate to home page
//       navigate('/');
//     } catch (error) {
//       setError(error.response?.data?.message || 'Invalid credentials');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//     <p className='text-center fs-4 mb-5'>Don't have an account? <a className='text-decoration-none text-success' href="/register">Sign Up</a></p>
//       <h2 className="text-center mb-4">Login</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
//           {isSubmitting ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { API_URL } from "../services";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const navigate = useNavigate(); // Initialize useNavigate

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			const response = await axios.post(
				// "http://localhost:5000/api/users/login",
				`${API_URL}/api/users/login`,
				{
					email,
					password,
				}
			);

			// Save token to local storage
			localStorage.setItem("token", response.data.token);
			alert("Login Successful");

			// Navigate to home page
			navigate("/");
		} catch (error) {
			setError(error.response?.data?.message || "Invalid credentials");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="container my-5">
			<div className="row g-0">
				{/* Left Column: Form */}
				<div className="col-md-6 p-5 bg-light">
					<h2 className="mb-4 text-center">Welcome Back!</h2>
					{error && <div className="alert alert-danger">{error}</div>}
					<form onSubmit={handleSubmit}>
						{/* Email */}
						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								Email
							</label>
							<input
								type="email"
								id="email"
								className="form-control"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email (e.g., felixek@gmail.com)"
								required
							/>
						</div>

						{/* Password */}
						<div className="mb-3">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<input
								type="password"
								id="password"
								className="form-control"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Password"
								required
							/>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="btn btn-success w-100"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Logging in..." : "Login"}
						</button>
					</form>

					{/* Additional Links */}
					<p className="text-center mt-3">
						Don't have an account?{" "}
						<a className="text-decoration-none text-success" href="/register">
							Sign Up
						</a>
					</p>
					<p className="text-center">
						<a
							className="text-decoration-none text-success"
							href="/forgot-password"
						>
							Forgot Password?
						</a>
					</p>
				</div>

				{/* Right Column: Image/Logo */}
				<div
					className="col-md-6 text-center d-flex justify-content-center align-items-center rounded-lg"
					style={{ backgroundColor: "#000000", borderRadius: "20px" }}
				>
					<img
						src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733432339/Frame_4_1_2_ooduat.png" // Replace with your logo/image URL
						alt="DashMe Africa Logo"
						className="img-fluid"
						style={{ maxWidth: "70%" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Login;
