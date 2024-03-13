import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

const Details = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setSelectedProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {selectedProduct && (
        <div className="container">
          <div className="slider">
            {selectedProduct.images && selectedProduct.images.length > 1 ? (
              <Slider {...sliderSettings}>
                {selectedProduct.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      style={{
                        width: "400px",
                        height: "400px",
                      }}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <img
                src={selectedProduct?.images[0]}
                alt={`Product Image ${1}`}
                style={{
                  width: "400px",
                  height: "400px",
                }}
              />
            )}
          </div>
          <div className="details">
            <div className="box">
              <h2>Title: {selectedProduct.title}</h2>
              <p>Description: {selectedProduct.description}</p>
              <p>Price: {selectedProduct.price}</p>
              <p>Discount: {selectedProduct.discountPercentage}</p>
              <p>Rating: {selectedProduct.rating}</p>
              <p>Stock: {selectedProduct.stock}</p>
              <p>Brand: {selectedProduct.brand}</p>
              <p>Category: {selectedProduct.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
