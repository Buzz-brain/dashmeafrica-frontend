import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services";

const AdminLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const { data } = await axios.post(`${API_URL}/api/admin/login`, {
				email,
				password,
			});
			localStorage.setItem("adminToken", data.token); // Save token
			alert("Login Successful");
			navigate("/adminDashboard"); // Redirect to dashboard
		} catch (err) {
			setError(err.response?.data?.message || "Login failed");
		}
	};

	return (
		<Container className="d-flex justify-content-center align-items-center vh-100">
			<Form
				onSubmit={handleLogin}
				className="p-4 border rounded shadow"
				style={{ width: "300px" }}
			>
				<h2 className="text-center mb-4">Admin Login</h2>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form.Group className="mb-3">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</Form.Group>
				<Button type="submit" variant="success" className="w-100">
					Login
				</Button>
			</Form>
		</Container>
	);
};

export default AdminLogin;
