import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top"></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title className="product-title" as={"div"}>
            <strong className="remove-underline">{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as={"h3"}>$ {product.price}</Card.Text>
        <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
      </Card.Body>
    </Card>
  );
};

export default Product;
