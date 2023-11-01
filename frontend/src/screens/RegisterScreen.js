import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { setCreadantials } from "../Slices/userSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandeler = async (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      toast.error("Password and Confirm password should be same");
    } else {
      try {
        const data = {
          email: email,
          password: password,
          name: name,
        };
        const reqOpt = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        const res = await fetch("http://localhost:5000/api/user", reqOpt);
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
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <FormContainer>
      <h1>Create User</h1>
      <Form onSubmit={submitHandeler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
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

        <Form.Group controlId="confPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter your password"
            value={confPassword}
            onChange={(e) => {
              setConfPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Button className="mt-2" type="submit" variant="primary">
          Register
        </Button>

        <Row className="py-3">
          <Col>
            Already Coustomer? <Link to="/login">Sing in</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
