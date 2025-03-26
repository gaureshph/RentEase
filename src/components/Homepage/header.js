import React from "react";
import {
  Navbar,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FaSearch, FaUserCircle, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "../css/header.css";
import icon from "../../images/icon.jpeg";

const RentEaseNavbar = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#4b792b" }}
      className="shadow-sm py-2"
    >
      <Container className="d-flex justify-content-between align-items-center">
        {/* Left Section: Logo & Tagline */}
        <Navbar.Brand
          href="/"
          className="text-white fw-bold"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={icon}
            alt="Logo"
            style={{ width: 50, height: 50, marginRight: "10px" }} // Adjust the margin for spacing between the icon and text
          />
          <span style={{ display: "inline-block" }}>
            Why Buy When You Can Rent
          </span>
        </Navbar.Brand>

        {/* Middle Section: Search Bar */}
        <Form className="d-flex flex-grow-1 justify-content-center">
          <div className="position-relative w-75">
            <FormControl
              type="search"
              placeholder="Search products..."
              className="me-2 rounded-pill ps-4"
            />
            <FaSearch
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#555",
              }}
            />
          </div>
        </Form>

        {/* Right Section: Location, List Button & Profile */}
        <div className="d-flex align-items-center">
          {/* Location Dropdown */}
          <NavDropdown
            title={
              <>
                <FaMapMarkerAlt className="me-1" />
                <span className="d-none d-md-inline">Location</span>
              </>
            }
            id="location-dropdown"
            className="text-white me-3"
          >
            <NavDropdown title="States of India" style={{ maxHeight: "200px", overflowY: "auto" }}></NavDropdown>
             <NavDropdown.Item href="#andhra-pradesh">Andhra Pradesh</NavDropdown.Item>
  <NavDropdown.Item href="#arunachal-pradesh">Arunachal Pradesh</NavDropdown.Item>
  <NavDropdown.Item href="#assam">Assam</NavDropdown.Item>
  <NavDropdown.Item href="#bihar">Bihar</NavDropdown.Item>
  <NavDropdown.Item href="#chhattisgarh">Chhattisgarh</NavDropdown.Item>
  <NavDropdown.Item href="#goa">Goa</NavDropdown.Item>
  <NavDropdown.Item href="#gujarat">Gujarat</NavDropdown.Item>
  <NavDropdown.Item href="#haryana">Haryana</NavDropdown.Item>
  <NavDropdown.Item href="#himachal-pradesh">Himachal Pradesh</NavDropdown.Item>
  <NavDropdown.Item href="#jharkhand">Jharkhand</NavDropdown.Item>
  <NavDropdown.Item href="#karnataka">Karnataka</NavDropdown.Item>
  <NavDropdown.Item href="#kerala">Kerala</NavDropdown.Item>
  <NavDropdown.Item href="#madhya-pradesh">Madhya Pradesh</NavDropdown.Item>
  <NavDropdown.Item href="#maharashtra">Maharashtra</NavDropdown.Item>
  <NavDropdown.Item href="#manipur">Manipur</NavDropdown.Item>
  <NavDropdown.Item href="#meghalaya">Meghalaya</NavDropdown.Item>
  <NavDropdown.Item href="#mizoram">Mizoram</NavDropdown.Item>
  <NavDropdown.Item href="#nagaland">Nagaland</NavDropdown.Item>
  <NavDropdown.Item href="#odisha">Odisha</NavDropdown.Item>
  <NavDropdown.Item href="#punjab">Punjab</NavDropdown.Item>
  <NavDropdown.Item href="#rajasthan">Rajasthan</NavDropdown.Item>
  <NavDropdown.Item href="#sikkim">Sikkim</NavDropdown.Item>
  <NavDropdown.Item href="#tamil-nadu">Tamil Nadu</NavDropdown.Item>
  <NavDropdown.Item href="#telangana">Telangana</NavDropdown.Item>
  <NavDropdown.Item href="#tripura">Tripura</NavDropdown.Item>
  <NavDropdown.Item href="#uttar-pradesh">Uttar Pradesh</NavDropdown.Item>
  <NavDropdown.Item href="#uttarakhand">Uttarakhand</NavDropdown.Item>
  <NavDropdown.Item href="#west-bengal">West Bengal</NavDropdown.Item>
</NavDropdown>

          {/* List Button */}
          <Button
            variant="light"
            className="me-3 d-flex align-items-center"
            onClick={() =>
              currentUser ? navigate("/list") : navigate("/login")
            }
          >
            <FaPlus className="me-1" /> List
          </Button>

          {/* Profile Section */}
          <NavDropdown
            title={
              <div className="d-inline">
                <FaUserCircle size={30} color="white" />
                {currentUser && (
                  <span className="ms-2 text-white">
                    {currentUser.username}
                  </span>
                )}
              </div>
            }
            id="profile-dropdown"
            align="end"
          >
            {currentUser ? (
              <>
                <NavDropdown.Item onClick={() => navigate("/profile")}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/my-listings")}>
                  My Listings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </>
            ) : (
              <>
                <NavDropdown.Item onClick={() => navigate("/login")}>
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/signup")}>
                  Sign Up
                </NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default RentEaseNavbar;
