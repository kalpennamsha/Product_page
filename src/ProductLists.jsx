import React, { useState, useEffect, useRef, useCallback } from "react";
import ProductItem from "./ProductItem";
import "./ProductList.css";
import "./App.css";
const ProductLists = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const page = useRef(1);
  const limit = 30;
  const observer = useRef();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setData([]); // Clear existing data when filters change
    page.current = 1; // Reset page number when filters change
    setHasMore(true); // Reset hasMore when filters change
    fetchProducts();
  }, [searchTerm, priceFilter, categoryFilter, sortOption, sortOrder]);

  const fetchProducts = useCallback(() => {
    const url = `https://dummyjson.com/products?limit=${limit}&skip=${
      (page.current - 1) * limit
    }`;

    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.products && responseData.products.length > 0) {
          setData((prevData) => {
            const uniqueProducts = responseData.products.filter(
              (newProduct) =>
                !prevData.some(
                  (existingProduct) => existingProduct.id === newProduct.id
                )
            );
            return [...prevData, ...uniqueProducts];
          });
          page.current++;
        } else {
          setHasMore(false);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [searchTerm, priceFilter, categoryFilter, sortOption, sortOrder]);

  const lastProductRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchProducts();
          }
        },
        { threshold: 1 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchProducts]
  );

  // Filter function
  const filteredData = data.filter((product) => {
    const titleMatch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const priceMatch = !priceFilter || product.price <= parseInt(priceFilter);
    const categoryMatch =
      !categoryFilter || product.category === categoryFilter;
    return titleMatch && priceMatch && categoryMatch;
  });

  // Sort function
  const sortedData = filteredData.sort((a, b) => {
    if (sortOption === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    } else if (sortOption === "title") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <div className="product-container">
      <div className="filters-container">
        <div className="filters">
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">Price</option>
            <option value="50">Under 50</option>
            <option value="100">Under 100</option>
            <option value="200">Under 200</option>
            <option value="500">Under 500</option>
            <option value="1000">Under 1000</option>
            <option value="1500">Under 1500</option>
            <option value="2000">Under 2000</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Category</option>
            <option value="smartphones">smartphones</option>
            <option value="laptops">laptops</option>
            <option value="fragrances">fragrances</option>
            <option value="skincare">skincare</option>
            <option value="groceries">groceries</option>
            <option value="home-decoration">home-decoration</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="title">Title</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Values</option>
            <option value="asc">low-to-High</option>
            <option value="desc">High-to-low</option>
          </select>
        </div>
      </div>
      {sortedData.length > 0 &&
        sortedData.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      {loading && <p>Loading...</p>}
      {!loading && hasMore && <div ref={lastProductRef}></div>}
    </div>
  );
};

export default ProductLists;
