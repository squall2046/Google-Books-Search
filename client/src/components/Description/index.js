import React from "react";
// import {Col} from "../Grid";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Description(props) {
  return (
    // <Col size="md-5">
    <span className="des" {...props}>{props.des}</span>
    // </Col>
  );
}

export default Description;
