import React, { useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {cartContext} from "../../context/CarContext"
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard/productCard";

export default function RecentProduct() {
  const { addToCart, setToCart } = useContext(cartContext);
  const [page, setPage] = useState(1);
  const [numOfPage, setNumOfPage] = useState(1);

  const pagesArray = [];
  for (let i = 1; i <= numOfPage; i++) {
    pagesArray.push(i);
  }

  function addProduct(productId) {
    return addToCart(productId)
      .then((res) => {
        toast.success("Product Added To Cart");
        setToCart(res.data);
      })
      .catch(() => {
        toast.error("Adding failed");
      });
  }

  function getAllProducts(page) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=12`)
      .then((res) => {
        setNumOfPage(res?.data.metadata.numberOfPages || 1);
        return res?.data.data;
      });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Products", page],
    queryFn: () => getAllProducts(page),
  });

  if (isError) {
    return <h2 className="text-red-500">{error?.response?.message || "Error"}</h2>;
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen bg-green-200">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="all">
          <div className="row">
            {data?.map((product) => (
              <ProductCard key={product.id} product={product} addProduct={addProduct} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 p-4">
        <button
          className={`px-4 py-2 rounded transition-colors duration-300
            ${page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400"}
            md:px-5 md:py-3
          `}
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        {pagesArray.map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`
              px-3 py-1 rounded mx-1 transition-colors duration-300
              ${page === num ? "bg-green-600 text-white shadow-lg" : "bg-gray-200 hover:bg-green-100"}
              md:px-4 md:py-2
            `}
          >
            {num}
          </button>
        ))}

        <button
          className={`px-4 py-2 rounded transition-colors duration-300
            ${page >= numOfPage ? "bg-gray-400 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400"}
            md:px-5 md:py-3
          `}
          onClick={() => setPage((old) => Math.min(old + 1, numOfPage))}
          disabled={page >= numOfPage}
        >
          Next
        </button>
      </div>
    </>
  );
}
