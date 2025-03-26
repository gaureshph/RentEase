import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const SelectDatesPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [item, setItem] = useState({});
  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/items/${itemId}`
        );
        const data = await response.json();
        setItem(data);
        setTotalCost(data.security_deposit);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, [itemId]);

  const handleDateChange = (date) => {
    setStartDate(date);
    const days =
      (item.rentType === "Monthly" ? 30 : item.rentType === "Weekly" ? 7 : 1) *
      count;
    const dateObj = new Date(date);
    dateObj.setDate(dateObj.getDate() + days);
    setEndDate(
      `${String(dateObj.getDate()).padStart(2, "0")}/${String(
        dateObj.getMonth() + 1
      ).padStart(2, "0")}/${dateObj.getFullYear()}`
    );
    setTotalCost(item.price * count + item.security_deposit);
  };

  return (
    <Container className="d-flex justify-content-center mt-4">
      <Card
        style={{
          width: "30rem",
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Card.Body>
          <Card.Title className="text-center mb-3">Select Duration</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Security Deposit (₹)</Form.Label>
              <Form.Control
                readOnly
                type="number"
                value={item.security_deposit}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                readOnly
                value={`₹${item.price} per ${
                  item.rentType === "Monthly"
                    ? "month"
                    : item.rentType === "Weekly"
                    ? "week"
                    : "day"
                }`}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="d-block mb-2">
                Select Start Date
              </Form.Label>
              {
                <DatePicker
                  value={startDate}
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                  inputClass="form-control"
                  style={{ marginTop: "5px" }}
                />
              }
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Number of
                {item.rentType === "Monthly"
                  ? " months"
                  : item.rentType === "Weekly"
                  ? " weeks"
                  : " days"}
              </Form.Label>
              <Form.Control
                type="number"
                value={count}
                onChange={(e) => {
                  setCount(e.target.value);
                  const days =
                    (item.rentType === "Monthly"
                      ? 30
                      : item.rentType === "Weekly"
                      ? 7
                      : 1) * e.target.value;
                  const dateObj = new Date(startDate);
                  dateObj.setDate(dateObj.getDate() + days);
                  setEndDate(
                    `${String(dateObj.getDate()).padStart(2, "0")}/${String(
                      dateObj.getMonth() + 1
                    ).padStart(2, "0")}/${dateObj.getFullYear()}`
                  );
                  setTotalCost(
                    item.price * e.target.value + item.security_deposit
                  );
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control readOnly value={endDate} />
            </Form.Group>
            <Button
              variant="success"
              className="w-100 mt-2"
              onClick={() => navigate("/address")}
            >
              Proceed
            </Button>
            {/* Display Total Cost */}
            <h5 className="mt-3 text-center">
              Total Cost: <strong>${totalCost}</strong>
            </h5>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SelectDatesPage;
