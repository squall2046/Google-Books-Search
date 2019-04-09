import React from "react";

export function Form(props) {
  return (
    <div style={{ textAlign: "center"}}>
      {props.children}
    </div>
  );
}

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  );
}
