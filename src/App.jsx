import React from "react";
import ProductDetails from "./ProductDetails"; // Import ProductDetails
import ProductLists from "./ProductLists";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <h1>Product Details</h1>
      <Router>
        <Routes>
          <Route path="/" element={<ProductLists />} />
          <Route path="product/:id" element={<ProductDetails />} />{" "}
        </Routes>
      </Router>
    </>
  );
}

export default App;
