// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const ProductItem = ({ product }) => {
//   return (
//     <div className="product">
//       <Link to={`/product/${product.id}`}>
//         <img src={product.images[0]} alt={`Product ${product.id}`} />
//       </Link>
//       <p>Title: {product.title}</p>
//       <p>Price: {product.price}</p>
//       <p>Category: {product.category}</p>
//     </div>
//   );
// };

// const FilteredProductList = ({ products }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const [sortOrder, setSortOrder] = useState("");

//   const filteredProducts = products.filter((product) => {
//     return (
//       product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (minPrice === "" || product.price >= parseFloat(minPrice)) &&
//       (maxPrice === "" || product.price <= parseFloat(maxPrice)) &&
//       (category === "" || product.category === category)
//     );
//   });

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortBy === "price") {
//       return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
//     } else if (sortBy === "title") {
//       return sortOrder === "asc"
//         ? a.title.localeCompare(b.title)
//         : b.title.localeCompare(a.title);
//     }
//     return 0;
//   });

//   return (
//     <div className="filtered-product-list">
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Min Price"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Max Price"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//         />
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="">All Categories</option>
//           <option value="category1">Category 1</option>
//           <option value="category2">Category 2</option>
//           {/* Add more categories as needed */}
//         </select>
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="">Sort By</option>
//           <option value="price">Price</option>
//           <option value="title">Title</option>
//         </select>
//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//         >
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>
//       </div>
//       <div className="product-list">
//         {sortedProducts.map((product) => (
//           <ProductItem key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FilteredProductList;
