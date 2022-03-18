import React from "react";
import ReactDOM from "react-dom";
import { Dapp } from "./components/Dapp";
import NavBar from "./components/NavBar"

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <NavBar />
    <Dapp />
  </React.StrictMode>,
  document.getElementById("root")
);