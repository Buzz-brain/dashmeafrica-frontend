import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../services";

const Profile = () => {
	const [user, setUser] = useState(null);
	const [image, setImage] = useState(null);
	const [sellerAccount, setSellerAccount] = useState(null);
	const [formData, setFormData] = useState({
		fullName: "",
		username: "",
		email: "",
		address: "",
		bio: "",
	});

	useEffect(() => {
		const fetchProfile = async () => {
			const token = localStorage.getItem("token");

			if (token) {
				try {
					const { data } = await axios.get(
						// "http://localhost:5000/api/userProfile/profile",
						`${API_URL}/api/userProfile/profile`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setUser(data);
					setFormData({
						fullName: data.fullName || "",
						username: data.username || "",
						email: data.email || "",
						address: data.address || "",
						bio: data.bio || "",
					});
				} catch (error) {
					console.error("Failed to fetch user profile", error);
				}
			}
		};

		fetchProfile();
	}, []); // Only runs on mount

	useEffect(() => {
		const fetchSellerAccount = async () => {
			if (user?._id) {
				try {
					const { data } = await axios.get(
						"${API_URL}/api/userProfile/seller/${user._id}/account",
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						}
					);
					setSellerAccount(data);
				} catch (error) {
					console.error("Failed to fetch seller account", error);
				}
			}
		};

		fetchSellerAccount();
	}, [user]); // Runs whenever `user` changes

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				document.getElementById("profile-img").src = reader.result;
			};
			reader.readAsDataURL(file);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");

		const formDataToSubmit = new FormData();

		// Append all form fields from state to FormData
		formDataToSubmit.append("fullName", formData.fullName);
		formDataToSubmit.append("username", formData.username);
		formDataToSubmit.append("email", formData.email);
		formDataToSubmit.append("address", formData.address);
		formDataToSubmit.append("bio", formData.bio);

		// Append the image file if selected.
		if (image) {
			formDataToSubmit.append("image", image);
		}

		try {
			const response = await axios.put(
				// 'http://localhost:5000/api/userProfile/profile', // Replace with your actual API URL.
				"${API_URL}/api/userProfile/profile", // Replace with your actual API URL.
				formDataToSubmit,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log("Response:", response);
			if (response.data) {
				setUser(response.data); // Update the user state.
				alert("Profile updated successfully");
			} else {
				alert(response.data.message || "Failed to update profile.");
			}
		} catch (error) {
			console.error("Failed to update profile:", error);
			alert("Failed to update profile");
		}
	};

	if (!user) {
		return <div className="text-center py-5">Loading...</div>;
	}

	return (
		<div className="container mt-5">
			<div className="row g-0">
				{/* Profile Section */}
				<div className="col-md-4 bg-light text-center p-4">
					<div className="mb-4">
						<img
							id="profile-img"
							src={user.profilePicture || "https://via.placeholder.com/150"}
							alt="Profile"
							className="rounded-circle img-fluid"
							style={{ width: "150px", height: "150px", objectFit: "cover" }}
						/>
					</div>

					<label className="btn btn-outline-primary btn-sm">
						Upload Picture
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="d-none"
						/>
					</label>

					<h3 className="fw-bold mt-3">{user.username || "Buzz Brain"}</h3>
					{sellerAccount && (
						<div className="mt-3 text-start">
							<p>
								<strong>Account Name:</strong> {sellerAccount.sellerAcctName}
							</p>
							<p>
								<strong>Account Number:</strong>{" "}
								{sellerAccount.sellerAcctNumber}
							</p>
							<p>
								<strong>Bank Name:</strong> {sellerAccount.sellerAcctBank}
							</p>
						</div>
					)}
				</div>

				{/* Edit Profile Section */}
				<div className="col-md-8 p-4">
					<h4 className="fw-bold">Edit Your Profile</h4>
					<form onSubmit={handleSubmit} className="mt-4">
						<div className="row mb-3">
							<div className="col-md-12">
								<label className="form-label">Full Name</label>
								<input
									type="text"
									name="fullName"
									className="form-control"
									value={formData.fullName}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-md-6">
								<label className="form-label">Username</label>
								<input
									type="text"
									name="username"
									className="form-control"
									value={formData.username}
									onChange={handleChange}
								/>
							</div>
							<div className="col-md-6">
								<label className="form-label">Email</label>
								<input
									type="email"
									name="email"
									className="form-control"
									value={formData.email}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="mb-3">
							<label className="form-label">Address</label>
							<input
								type="text"
								name="address"
								className="form-control"
								value={formData.address}
								onChange={handleChange}
							/>
						</div>
						<div className="mb-4">
							<label className="form-label">Bio</label>
							<textarea
								name="bio"
								className="form-control"
								rows="3"
								value={formData.bio}
								onChange={handleChange}
							></textarea>
						</div>
						<button type="submit" className="btn btn-success w-100">
							Save Changes
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Profile;
