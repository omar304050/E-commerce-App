import React, { useContext, useEffect, useState } from 'react';
import './Cart.module.css';
import { cartContext } from '../../context/CarContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  let { getCartItem, removeCartItem, ubdateQuntity, setToCart } = useContext(cartContext);

  async function removeItem(productId) {
    let data = await removeCartItem(productId);
    setCartDetails(data.data);
    setToCart(data.data);
  }

  async function getCart() {
    let data = await getCartItem();
    setCartDetails(data.data);
    console.log(data.data);
  }

  async function udateCart(productId, count) {
    if (count < 1) {
      removeItem(productId);
    } else {
      let data = await ubdateQuntity(productId, count);
      setCartDetails(data.data);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {/* Desktop View: Table Layout (visible from md and above) */}
      <div className="relative mt-8 overflow-x-auto shadow-md sm:rounded-lg hidden md:block">
        <table className="w-full md:w-3/4 mx-auto text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="flex justify-between items-center">
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.data.products.map((product) => (
              <tr
                key={product.product.id}
                className="bg-white border-b flex justify-between items-center border-gray-200 hover:bg-gray-50"
              >
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-52 md:w-32 lg:w-44 max-w-full max-h-full"
                    alt={product.product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 md:w-1/5">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        udateCart(product.product.id, product.count - 1)
                      }
                      className="inline-flex items-center justify-center p-1 mr-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <span className="sr-only">Decrease quantity</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span>{product.count}</span>
                    </div>
                    <button
                      onClick={() =>
                        udateCart(product.product.id, product.count + 1)
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <span className="sr-only">Increase quantity</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  <span className="text-green-500">
                    {product.price * product.count} EGP
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeItem(product.product.id)}
                    className="font-medium text-white rounded-2xl p-2 bg-red-400"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-center">
          <Link to="/checkout">
            <button className="bg-green-500 text-white rounded-md p-2 w-3/4 mx-auto">
              CheckOut Now
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile View: Card Layout (visible on small screens) */}
      <div className="mt-8 md:hidden space-y-4 px-4">
        {cartDetails?.data.products.map((product) => (
          <div
            key={product.product.id}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <div className="flex items-center">
              <img
                src={product.product.imageCover}
                className="w-24 h-24 object-cover rounded"
                alt={product.product.title}
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-bold">
                  {product.product.title}
                </h3>
                <p className="text-green-500 font-semibold">
                  {product.price * product.count} EGP
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <button
                  onClick={() =>
                    udateCart(product.product.id, product.count - 1)
                  }
                  className="p-2 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <span className="mx-2">{product.count}</span>
                <button
                  onClick={() =>
                    udateCart(product.product.id, product.count + 1)
                  }
                  className="p-2 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => removeItem(product.product.id)}
                className="text-white bg-red-400 px-4 py-2 rounded-full"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <Link to="/checkout">
          <button className="bg-green-500 text-white w-full py-3 rounded-md">
            CheckOut Now
          </button>
        </Link>
      </div>
    </>
  );
}
