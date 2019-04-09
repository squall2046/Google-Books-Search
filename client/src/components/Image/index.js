import React from "react";
// import { Col } from "../Grid";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Image(props) {
  return (
    // <Col size="md-4">
      <img alt="book" className="image" {...props} src={props.img} />
    // </Col>
  );
}

export default Image;
