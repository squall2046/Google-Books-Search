import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <span className="save-btn" {...props} role="button" tabIndex="0">
     <h1><i class="fas fa-save"></i></h1>
    </span>
  );
}

export default SaveBtn;
