import React from "react";
import { Link } from "react-router-dom";
import "./FilteredProductList";

const ProductItem = ({ product }) => {
  return (
    <div className="product">
      <Link to={`/product/${product.id}`}>
        <img src={product.images[0]} alt={`Product ${product.id}`} />
      </Link>
      <p>Title: {product.title}</p>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default ProductItem;
