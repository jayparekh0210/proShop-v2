import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import ShimmerHome from "./ShimmerHome";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    const { data } = await axios.get("http://localhost:5000/api/products");
    setProducts(data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.length === 0 ? (
          <ShimmerHome />
        ) : (
          products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
