import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

const HomeScreen = () => {
	const [products, setProducts] = useState([]); // State to store products

	// Fetch products when the component mounts
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const { data } = await axios.get(`${API_URL}/api/products`); // Make a GET request to your backend
				// Sort products by createdAt in descending order
				const sortedProducts = data.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);
				setProducts(sortedProducts); // Store sorted products in state
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProducts();
	}, []); // Empty array ensures this runs only once when the component mounts

	return (
		<>
			{/* Header Row with "Recommended for You" and "See All" */}
			<Row className="align-items-center mb-1 px-5">
				<Col>
					<h4 className="mb-0">Recommended for You</h4>
				</Col>
				<Col className="text-end">
					<Link
						to="/products"
						className="text-success fs-5 text-decoration-none"
					>
						See All
					</Link>
				</Col>
			</Row>

			{/* Product Cards */}
			<Row className="px-5">
				{products.map((product) => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={2}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default HomeScreen;
