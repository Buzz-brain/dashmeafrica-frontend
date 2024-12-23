// src/screens/ProductDetails.jsx

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, Spinner, Alert, Badge } from "react-bootstrap";
// import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { API_URL } from "./../services/index";

const ProductDetails = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	// const { addToCart } = useCart(); // Get the addToCart function from context

	const navigate = useNavigate();

	const buyNowHandler = () => {
		if (!product) return; // Ensure product data exists
		navigate("/checkout", { state: { product, seller: product.uploader._id } }); // Navigate to checkout with product details
	};

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const { data } = await axios.get(`${API_URL}/api/products/${id}`);
				setProduct(data);
			} catch (err) {
				setError("Failed to fetch product details. Please try again.");
			} finally {
				setLoading(false);
			}
		};
		fetchProduct();
	}, [id]);
	// console.log(product);

	// const addToCartHandler = () => {
	//   console.log("Adding to cart:", product); // Confirm the product data
	//   addToCart(product);
	//   alert("Item added to cart!");
	// };

	if (loading) {
		return (
			<Spinner
				animation="border"
				variant="primary"
				className="d-block mx-auto my-5"
			/>
		);
	}

	if (error) {
		return (
			<Alert variant="danger" className="text-center my-5">
				{error}
			</Alert>
		);
	}

	return (
		product && (
			<div className="container my-5">
				<div className="row">
					{/* Left Column: Product Images */}
					<div className="col-md-6">
						<div className="product-images">
							<img
								src={product.image}
								alt={product.title}
								className="img-fluid mb-3 border"
								style={{
									height: "400px",
									objectFit: "cover",
									borderRadius: "10px",
								}}
							/>
							<div className="d-flex">
								{product.featureImages?.map((img, index) => (
									<img
										key={index}
										src={img}
										alt={`Thumbnail ${index + 1}`}
										className="img-thumbnail me-2"
										style={{
											width: "60px",
											height: "60px",
											objectFit: "cover",
											cursor: "pointer",
										}}
									/>
								))}
							</div>
						</div>
					</div>

					{/* Right Column: Product Details */}
					<div className="col-md-6">
						<h2 className="mb-3">{product.title}</h2>
						<p>
							<strong>User Profile: </strong>
							<Badge bg="info">{product.uploader.username || "Unknown"}</Badge>
						</p>
						<p>
							<strong>Availability: </strong>
							<Badge bg={product.availability ? "success" : "danger"}>
								{product.availability ? "Available" : "Out of Stock"}
							</Badge>
						</p>
						<p>
							<strong>Description: </strong>
							{product.description}
						</p>

						<p>
							<strong>Choose Size: </strong>
							<Button variant="outline-success" className="me-2">
								Small
							</Button>
							<Button variant="outline-success" className="me-2">
								Medium
							</Button>
							<Button variant="outline-success" className="me-2">
								Large
							</Button>
							<Button variant="outline-success" className="me-2">
								X-Large
							</Button>
						</p>

						{product.tag === "sell" ? (
							<h4 className="text-success">N {product.price}</h4>
						) : (
							<h4 className="text-primary">Donate</h4>
						)}

						<div className="d-flex mt-4">
							<Link
								to={`/profile/${product.uploader.username}`}
								className="bg-[var(--bs-blue)] text-neutral-100 px-6 py-2 rounded-md"
							>
								Message Profile
							</Link>
							{/* <Button variant="primary">Add to Saved Items</Button> */}
							{/* <Button variant="success" onClick={addToCartHandler}>Add to Cart</Button> */}
							<Button
								variant="success"
								className="ms-2"
								onClick={buyNowHandler}
							>
								Buy Now
							</Button>
						</div>
					</div>
				</div>

				{/* Related Products Section */}
				<div className="related-products mt-5">
					<h4>Other Items from {product.uploader.username || "this user"}</h4>
					<div className="d-flex overflow-auto">
						{product.relatedProducts?.map((item, index) => (
							<Card key={index} className="me-3" style={{ width: "150px" }}>
								<Card.Img
									src={item.image}
									alt={item.title}
									style={{ height: "100px", objectFit: "cover" }}
								/>
								<Card.Body>
									<Card.Title as="div" className="fs-6">
										{item.title}
									</Card.Title>
									<Card.Text className="text-success">N{item.price}</Card.Text>
								</Card.Body>
							</Card>
						))}
					</div>
				</div>
			</div>
		)
	);
};

export default ProductDetails;
