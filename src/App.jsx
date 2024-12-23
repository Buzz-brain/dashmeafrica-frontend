import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setItems } from "./features/items/itemsSlice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Formhead from "./components/Formhead";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import UploadPage from "./components/UploadPage";
import HomeScreen from "./screens/HomeScreen";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import ForgotPwd from "./components/ForgotPwd";
import AdminDashboard from "./components/AdminDashboard";
import EditProduct from "./components/EditProduct";
// import MonnifyPayment from './components/MonnifyPayment';
import ProductDetails from "./screens/ProductDetails";
import CartScreen from "./screens/CartScreen";
import DisbursementForm from "./components/DisbursementForm";
import PaymentPage from "./components/PaymentPage";
import AccountDetails from "./components/AccountDetails";
import Checkout from "./screens/Checkout";
import GoShiip from "./components/GoShiip";
import MyProducts from "./components/MyProducts";
import RateComponent from "./components/RateComponent";
import OTP from "./components/oneTimePayment";
import "./tailwind.css";
import MesaageProfile from "./screens/MesaageProfile";

// import Home from './components/Home';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// Example: Set initial items
		const sampleItems = ["Item 1", "Item 2", "Item 3"];
		dispatch(setItems(sampleItems));
	}, [dispatch]);

	return (
		<div>
			<Router>
				<main>
					<Routes>
						<Route
							path="/"
							element={
								<>
									<Header /> <Hero /> <HomeScreen />{" "}
								</>
							}
						/>
						<Route
							path="/profile/:username"
							element={
								<>
									<Header /> <MesaageProfile />
								</>
							}
						/>
						<Route
							path="/upload"
							element={
								<>
									<Header /> <UploadPage />
								</>
							}
						/>
						<Route
							path="/profile"
							element={
								<>
									<Header /> <Profile />
								</>
							}
						/>
						<Route
							path="/register"
							element={
								<>
									<Formhead /> <Register />
								</>
							}
						/>
						<Route
							path="/login"
							element={
								<>
									<Formhead />
									<Login />
								</>
							}
						/>
						<Route path="/adminLogin" element={<AdminLogin />} />
						<Route path="/adminRegister" element={<AdminRegister />} />
						<Route path="/adminDashboard" element={<AdminDashboard />} />
						<Route path="/admin/products/edit/:id" element={<EditProduct />} />
						<Route
							path="/product/:id"
							element={
								<>
									<Header /> <ProductDetails />
								</>
							}
						/>
						<Route
							path="/forgot-password"
							element={
								<>
									<Formhead /> <ForgotPwd />
								</>
							}
						/>
						<Route
							path="/forgot-password"
							element={
								<>
									<Formhead /> <ForgotPwd />
								</>
							}
						/>
						<Route
							path="/payment-page"
							element={
								<>
									<Formhead /> <PaymentPage />
								</>
							}
						/>
						{/* <Route path="/checkout" element={<><Formhead /> <MonnifyPayment /></>} /> */}
						<Route
							path="/cart"
							element={
								<>
									<Header /> <CartScreen />
								</>
							}
						/>
						<Route
							path="/disburse"
							element={
								<>
									<Header /> <DisbursementForm />
								</>
							}
						/>
						<Route
							path="/checkout"
							element={
								<>
									<Header /> <Checkout />
								</>
							}
						/>
						<Route
							path="/accountdetails"
							element={
								<>
									<Header /> <AccountDetails />
								</>
							}
						/>
						<Route
							path="/goshiip"
							element={
								<>
									<Header /> <GoShiip /> <RateComponent />{" "}
								</>
							}
						/>
						<Route
							path="/my-products"
							element={
								<>
									<Header /> <MyProducts />
								</>
							}
						/>
						<Route
							path="/otp"
							element={
								<>
									<Formhead /> <OTP />
								</>
							}
						/>
					</Routes>
				</main>
				<Footer />
			</Router>
		</div>
	);
};

export default App;
