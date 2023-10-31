import React from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Slices/userSlice";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
const Headers = () => {
  const { items } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandeler = async () => {
    try {
      const reqOpt = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch("http://localhost:5000/api/user/login", reqOpt);
      const resData = await res.json();
      console.log(resData);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>
              <img src={logo} /> Parekh shop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="cart">
                <Nav.Link href="/cart">
                  <FaShoppingCart /> Cart
                  {items.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {items.reduce((acc, i) => {
                        return acc + i.qty;
                      }, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo?.name ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item> profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandeler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Headers;
