import React from "react";
import "./style.css";

function Results({ children }) {
  return (
    <div className="Results" id="Results">
      <div className="h1">Results</div>
      {children}
    </div>
  );
}

export default Results;
