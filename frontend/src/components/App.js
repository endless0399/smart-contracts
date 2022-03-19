import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dapp } from "./Dapp";
import { Transactions } from "./Transactions";
import { About } from "./About";
import { NavBar } from "./util/NavBar";

export class App extends React.Component{
  render() {
    return (
      <div>
        <BrowserRouter>
        <NavBar />
          <Routes>
            <Route exact path="/" element={<Dapp/>} />
            <Route exact path="/transactions" element={<Transactions/>} />
            <Route exact path="/about" element={<About/>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
};