import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { setCreadantials } from "../Slices/userSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandeler = async (e) => {
    e.preventDefault();
    try {
      const data = { email: email, password: password };
      const reqOpt = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const res = await fetch("http://localhost:5000/api/user/login", reqOpt);
      const resData = await res.json();
      if (resData.name) {
        dispatch(setCreadantials({ ...resData }));
        navigate(redirect);
      } else if (resData.message) {
        toast.error(resData.message);
      }
    } catch (err) {
      toast.error(err?.name || err.error);
      console.log(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandeler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Button className="mt-2" type="submit" variant="primary">
          Sign In
        </Button>

        <Row className="py-3">
          <Col>
            New Coustomer? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
