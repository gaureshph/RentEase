import React from "react";
import { Container, Button } from "react-bootstrap";

const PaymentSuccess = () => {
  return (
    <Container className="text-center mt-5">
      <h2 className="text-success">🎉 Payment Successful! 🎉</h2>
      <p className="mt-3">Thank you for your payment. Your rental request has been processed.</p>
      
      <Button variant="primary" onClick={() => window.location.href = "/"}>
        Go to Home Page
      </Button>
    </Container>
  );
};

export default PaymentSuccess;