import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

const Checkout = () => {
  const { state } = useLocation();
  const { product, sellerId } = state || {};
  const [quantity, setQuantity] = useState(1);
  const [deliveryDetails, setDeliveryDetails] = useState({
    fromAddress: { name: "", email: "", address: "", phone: "" },
    toAddress: { name: "", email: "", address: "", phone: "" },
    parcels: { width: "10", length: "10", height: "5", weight: "2" },
    items: [
      {
        name: product?.title || "",
        description: product?.description || "",
        weight: "2",
        category: product?.category || "",
        amount: product?.price || 0,
        quantity: quantity,
      },
    ],
  });

  const [user, setUser] = useState({ fullName: "", email: "" });
  const [couriers, setCouriers] = useState([]);
  const [type, setType] = useState("");
  const [selectedCourier, setSelectedCourier] = useState("");
  const [rateDetails, setRateDetails] = useState(null);
  const [sellerBankDetails, setSellerBankDetails] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');


  const displayAlert = (message, variant = 'success', duration = 5000) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, duration);
  };


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await axios.get(`${apiURL}/userProfile/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser({ fullName: data.fullName, email: data.email, address: data.address });
          setDeliveryDetails((prev) => ({
            ...prev,
            toAddress: { ...prev.toAddress, name: data.fullName, email: data.email, address: data.address },
          }));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    const fetchSellerDetails = async () => {
      if (sellerId) {
        try {
          const { data } = await axios.get(`${apiURL}/payment/seller/${sellerId}`);
          setDeliveryDetails((prev) => ({
            ...prev,
            fromAddress: {
              name: data.seller.fullName,
              email: data.seller.email,
              address: data.seller.address,
              phone: "09155802922",
            },
          }));
          setSellerBankDetails(data)
        } catch (error) {
          console.error("Error fetching seller details:", error);
        }
      }
    };

    fetchUser();
    fetchSellerDetails();
  }, [sellerId]);

  const handleFetchCouriers = async () => {
    if (!type) {
      displayAlert('Please select type and fetch couriers.', 'danger');
      return;
    }
    try {
      const response = await axios.get(`${apiURL}/couriers`, { params: { type } });
      setCouriers(response.data.data || []);
      displayAlert('Couriers fetched successfully! You can now choose a courier.');
    } catch (error) {
      console.error("Error fetching couriers:", error);
      displayAlert('Failed to fetch couriers.', 'danger');
    }
  };

  const handleFetchRate = async () => {
    if (!selectedCourier) {
      displayAlert('Please select a courier to calculate rate', 'danger');
      return;
    }
    const validatePayload = (payload) => {
      const { toAddress } = payload;
      if (!toAddress?.name) {
        return "Name is required.";
      }
      if (!toAddress?.email) {
        return "Email is required.";
      }
      if (!toAddress?.address) {
        return "Address is required.";
      }
      if (!toAddress?.phone) {
        return "Phone number is required.";
      }
      return null;
    };

    try {
      const payload = {
        type,
        carrierName: selectedCourier,
        ...deliveryDetails,
      };

      // Validate payload before making the request
      const validationError = validatePayload(payload);
      if (validationError) {
        displayAlert(validationError, 'danger');
        return;
      }
      const { data } = await axios.post(`${apiURL}/rates`, payload);
      setRateDetails(data.data.rates);
      displayAlert('Rate fetched successfully!. Proceed to payment');
    } catch (error) {
      console.error("Error fetching rates:", error.response?.data || error.message);
      displayAlert('Failed to fetch rates.', 'danger');
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
    setDeliveryDetails((prev) => ({
      ...prev,
      items: prev.items.map((item) => ({ ...item, quantity: quantity + change })),
    }));
  };

  const handlePayment = async () => {
    if (!sellerBankDetails) {
      displayAlert('Seller bank details are required for payment.', 'danger');
      return;
    }
    if (!rateDetails) {
      displayAlert('Calculate Rate before proceeding to checkout', 'danger');
      return;
    }

    try {
      // Initiating subaccount creation for the seller
      const subaccountResponse = await axios.post(`${apiURL}/payment/subaccount`, {
        businessName: sellerBankDetails.seller.accountName,
        bankName: sellerBankDetails.seller.bankName,
        accountNumber: sellerBankDetails.seller.accountNumber,
        percentageCharge: 30,
      });

      const subaccountCode = subaccountResponse.data.data.subaccount_code;

      // Initializing the transaction
      const transactionResponse = await axios.post(`${apiURL}/payment/initialize-transaction`, {
        email: user.email,
        amount: total * 100,
        subaccount: subaccountCode,
        transactionCharge: 10000, // Optional: Flat fee for main account
        bearer: 'subaccount', // Optional: Who bears the charge
      });

      displayAlert('Payment initialization successful. Redirecting...');
      // Redirect to Paystack payment page
      window.location.href = transactionResponse.data.data.authorization_url;
    } catch (error) {
      console.error('Error during payment:', error.response?.data.message || error.message);
      displayAlert('Payment initialization failed. Please try again.', 'danger');
    }
  };

  const total = product?.price * quantity + (rateDetails?.amount || 0);

  return (
    <div className="container my-5">
      <div className="row">
        {/* Billing Details */}
        <div className="col-md-6">
          <h3 className="mb-4 text-success">Billing Details</h3>
          <Alert variant={alertVariant} show={showAlert}>
            {alertMessage}
          </Alert>

          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control value={deliveryDetails.toAddress.name} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control value={deliveryDetails.toAddress.email} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={deliveryDetails.toAddress.address}
                onChange={(e) =>
                  setDeliveryDetails((prev) => ({
                    ...prev,
                    toAddress: { ...prev.toAddress, address: e.target.value },
                  }))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={deliveryDetails.toAddress.phone}
                onChange={(e) =>
                  setDeliveryDetails((prev) => ({
                    ...prev,
                    toAddress: { ...prev.toAddress, phone: e.target.value },
                  }))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="interstate">Interstate</option>
                <option value="intrastate">Intrastate</option>
                <option value="international">International</option>
                <option value="frozen-international">Frozen International</option>
                <option value="all">All</option>
              </Form.Select>
            </Form.Group>
            <Button onClick={handleFetchCouriers}>Fetch Couriers</Button>
            <Form.Group>
              <Form.Label>Courier</Form.Label>
              <Form.Select
                value={selectedCourier}
                onChange={(e) => setSelectedCourier(e.target.value)}
              >
                <option value="">Select Courier</option>
                {couriers.map((courier, idx) => (
                  <option key={idx} value={courier.name}>
                    {courier.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button onClick={handleFetchRate}>Calculate Rate</Button>
          </Form>
        </div>

        {/* Product Summary */}
        <div className="col-md-6">
          <Card className="p-4">
            <h5>Order Summary</h5>
            {product && (
              <div className="mb-4">
                <div className="d-flex align-items-center justify-content-between">
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                  <div className="ms-3">
                    <h6>{product.title}</h6>
                    <p>Price: N{product.price}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleQuantityChange(-1)}
                      className="px-2"
                    >
                      -
                    </Button>
                    <span className="px-3">{quantity}</span>
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleQuantityChange(1)}
                      className="px-2"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {rateDetails && (
              <div className="mt-4">
                <h5>Shipping Details:</h5>
                <p>Courier: {rateDetails.courier.name}</p>
                <p>Amount: {rateDetails.amount} {rateDetails.currency}</p>
                <p>Estimated Delivery: {rateDetails.estimated_days}</p>
                <p>Pickup Info: {rateDetails.pickup}</p>
              </div>
            )}
            <div className="d-flex justify-content-between">
              <p>Total</p>
              <p>N{total}</p>
            </div>
            <Button
              variant="success"
              className="w-100"
              onClick={handlePayment}
            >
              Proceed to Payment
            </Button>
          </Card>
        </div>


      </div>
    </div>
  );
};

export default Checkout;
