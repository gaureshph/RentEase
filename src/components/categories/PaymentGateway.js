import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PaymentGateway = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    netBanking: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/paymentstatus")
  };

  return (
    <Container className="p-4">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center text-success mb-4">Secure Payment</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Select Payment Method *</Form.Label>
            <Form.Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="creditCard">Credit/Debit Card</option>
              <option value="upi">UPI</option>
              <option value="netBanking">Net Banking</option>
            </Form.Select>
          </Form.Group>

          {paymentMethod === "creditCard" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Card Number *</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  placeholder="Enter card number"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Expiry Date *</Form.Label>
                <Form.Control
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CVV *</Form.Label>
                <Form.Control
                  type="password"
                  name="cvv"
                  placeholder="Enter CVV"
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {paymentMethod === "upi" && (
            <Form.Group className="mb-3">
              <Form.Label>UPI ID *</Form.Label>
              <Form.Control
                type="text"
                name="upiId"
                placeholder="Enter UPI ID"
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {paymentMethod === "netBanking" && (
            <Form.Group className="mb-3">
              <Form.Label>Select Bank *</Form.Label>
              <Form.Select
                name="netBanking"
                onChange={handleChange}
              >
                <option value="">Choose a bank</option>
                <option value="SBI">State Bank of India</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="Axis">Axis Bank</option>
              </Form.Select>
            </Form.Group>
          )}

          <div className="text-center">
            <Button variant="success" size="lg" type="submit">
              Pay
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default PaymentGateway;