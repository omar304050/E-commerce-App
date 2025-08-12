// ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, addProduct }) {
  return (
    <div className="lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-4 py-4">
      <div className="product border border-green-500 p-3 overflow-hidden rounded-3xl">
        <Link to={`productdetails/${product._id}`}>
          <img className="w-full" src={product.imageCover} alt={product.title} />
          <span className="block font-light text-green-500">{product.category.name}</span>
          <h3 className="text-lg font-bold text-black">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h3>
          <div className="flex justify-between items-center">
            <span>{product.price}EGP</span>
            <span>
              {product.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i>
            </span>
          </div>
        </Link>
        <button className="btn" onClick={() => addProduct(product._id)}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
