import React from "react";
import { Row, Col } from "react-bootstrap";

const ShimmerHome = () => {
  const array = ["1", "2", "3", "4", "5", "6", "7", "8"];
  return (
    <>
      <Row>
        {array.map((p) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3}>
              <div className="my-3 p-3 rounded card shimmerCard"></div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ShimmerHome;
