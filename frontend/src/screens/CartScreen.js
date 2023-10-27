import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addProduct, removeProduct, clearCart } from "../Slices/cartSlice";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

import { FaTrash } from "react-icons/fa";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addTocartHandeler = async (item, qty) => {
    dispatch(addProduct({ ...item, qty }));
  };

  const checkOuthandeler = () => {
    navigate("/login?redirect=/shoping");
  };

  const removeFromCartHaneler = async (id) => {
    dispatch(removeProduct(id));
  };

  const clearCartHandeler = async () => {
    dispatch(clearCart());
  };

  const cart = useSelector((state) => {
    return state.cart;
  });
  const { items } = cart;

  return (
    <>
      <Row>
        <Col md={8}>
          <h1 style={{ marginBottom: "20px" }}>Shoping Cart</h1>

          {items.length === 0 ? (
            <Message variant={"info"}>
              Your cart is empty <Link to="/">Go Back...</Link>
            </Message>
          ) : (
            <>
              <Button
                type="button"
                onClick={() => {
                  clearCartHandeler();
                }}
              >
                Clear Cart
              </Button>
              <ListGroup variant="flush">
                {items.map((item) => {
                  return (
                    <ListGroup.Item>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} fluid rounded />
                        </Col>
                        <Col md={3}>
                          <Link to={`/products/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                        <Col md={3}>
                          <Form.Control
                            as={"select"}
                            value={item.qty}
                            onChange={(e) => {
                              return addTocartHandeler(
                                item,
                                Number(e.target.value)
                              );
                            }}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => {
                              return (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => {
                              removeFromCartHaneler(item._id);
                            }}
                          >
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>
                  Sub Total :{" "}
                  {items.reduce((acc, item) => {
                    return acc + item.qty;
                  }, 0)}{" "}
                  Items{" "}
                </h2>
                $
                {items.reduce((acc, item) => {
                  return acc + item.qty * item.price;
                }, 0)}
              </ListGroup.Item>
              <ListGroup.Item>
                <button
                  className=" btn btn-dark btn-block"
                  disabled={items.length === 0}
                  onClick={checkOuthandeler}
                >
                  {" "}
                  Proceed to Check out{" "}
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
