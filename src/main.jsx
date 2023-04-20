import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>
      <LINK>
        <App />
      </LINK>
    </div>
  </React.StrictMode>
);

function LINK(props, child) {
  window.location.href = "sourceonesupplierapp://details";
  return <div>{props.children}</div>;
}
