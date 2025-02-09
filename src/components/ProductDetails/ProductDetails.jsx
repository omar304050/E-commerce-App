import React, { useEffect, useState } from 'react';
import './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';

export default function Details() {
  const [productDetails, setProductDetails] = useState(null);
  const { id } = useParams();

  // دالة لجلب تفاصيل المنتج من الـ API
  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        setProductDetails(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }

  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
  }, [id]);

  return (
    <div className="mx-auto w-9/12 my-16">
      <div className="flex flex-col md:flex-row gap-10 justify-between items-center">
        {/* قسم عرض الصور باستخدام Slider */}
        <div className="w-full md:w-3/12">
          <Slider dots>
            {productDetails?.images?.map((image, i) => (
              <div key={i}>
                <img src={image} className="object-cover" alt={`Product Image ${i + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
        {/* قسم تفاصيل المنتج */}
        <div className="w-full md:w-8/12 items-center text-center md:text-start">
          <h2>{productDetails?.title}</h2>
          <p className="text-gray-500 my-5">{productDetails?.description}</p>
          <div className="product p-3">
            <div className="flex justify-between items-center">
              <span>{productDetails?.price} EGP</span>
              <span>
                {productDetails?.ratingsAverage}{" "}
                <i className="fa-solid fa-star text-yellow-400"></i>
              </span>
            </div>
            <button className="btn2 my-5">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
