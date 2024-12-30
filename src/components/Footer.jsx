import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-light py-5">
			<Container>
				{/* Top Section */}
				<Row className="text-center">
					<Col>
						<h5 className="fw-bold">WANT TO PUT A SMILE ON SOMEONE'S FACE?</h5>
					</Col>
				</Row>
				<Row className="text-center mt-3">
					<Col>
						<Button variant="success" className="mx-2 px-4">
							Sell
						</Button>
						<Button variant="outline-success" className="mx-2 px-4">
							Donate
						</Button>
					</Col>
				</Row>
				<Row className="text-center mt-3">
					<Col>
						<a href="#signup" className="text-success fw-bold">
							SIGN UP
						</a>{" "}
						TO RECEIVE WEEKEND DISCOUNT OFFERS
					</Col>
				</Row>

				<hr className="my-5" />

				{/* Bottom Section */}
				<Row className="text-center text-md-start">
					{/* Logo and Social Links */}
					<Col md={3} className="mb-4 mb-md-0">
						<img
							src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733432001/Frame_5_2_1_iomywh.png" // Replace with your logo URL
							// src="https://via.placeholder.com/120" // Replace with your logo URL
							alt="DashMeAfrica Logo"
							className="mb-3"
						/>
						<div>
							<a href="https://facebook.com" className="me-3 text-dark">
								<i className="bi bi-facebook fs-4"></i>
							</a>
							<a href="https://tiktok.com" className="text-dark">
								<i className="bi bi-tiktok fs-4"></i>
							</a>
						</div>
					</Col>

					{/* Mission Statement */}
					<Col md={3} className="mb-4 mb-md-0">
						<h6 className="fw-bold">Our Mission</h6>
						<p className="text-muted">
							To become the leading online marketplace where we help you donate
							or sell your used items at giveaway prices, thereby reducing CO2
							emissions through our platform.
						</p>
					</Col>

					{/* Nigeria Address */}
					{/* <Col md={3} className="mb-4 mb-md-0">
            <h6 className="fw-bold">Phone number</h6>
              <a href="tel:+2347008675984" className="text-dark">+234 700 867 5984</a><br />
          </Col> */}

					{/* UK Address */}
					<Col md={3}>
						<h6 className="fw-bold">Email</h6>
						<a href="mailto:talktous@dashmeafrica.com " className="text-dark">
							talktous@dashmeafrica.com{" "}
						</a>
					</Col>
				</Row>

				<hr className="mt-5" />

				<Row>
					<Col className="text-center text-muted">
						<small>DashMeAfrica &copy; {currentYear}</small>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
