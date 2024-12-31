import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../services";

const AdminRegister = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
			return;
		}

		try {
			const response = await axios.post(`${API_URL}/api/admin/register`, {
				email,
				password,
			});

			if (response.data) {
				setSuccess(true);
				setMessage("Admin registered successfully");
				setEmail("");
				setPassword("");
				setConfirmPassword("");
			}
		} catch (error) {
			setMessage(error.response?.data?.message || "An error occurred");
		}
	};

	return (
		<div className="container my-5">
			<h2>Admin Registration</h2>
			<form onSubmit={handleSubmit}>
				{message && (
					<div
						className={`alert ${success ? "alert-success" : "alert-danger"}`}
					>
						{message}
					</div>
				)}
				<div className="mb-3">
					<label className="form-label">Email address</label>
					<input
						type="email"
						className="form-control"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Password</label>
					<input
						type="password"
						className="form-control"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Confirm Password</label>
					<input
						type="password"
						className="form-control"
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-success">
					Register
				</button>
			</form>
		</div>
	);
};

export default AdminRegister;
