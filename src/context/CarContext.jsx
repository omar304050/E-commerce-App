import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext()


export default function CartContextProvider(props) {

  let [cart ,setToCart]=   useState(null)
    let headers = {

        token: localStorage.getItem("userToken")
    }
    function addToCart(productId) {


        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            {

                productId
            },
            {
                headers
            }
        )
            .then((respnse) => respnse)
            .catch((err) => err)


    }
    function checkOut(catId , url , formValue) {


        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${catId}?url=${url}`,
            {

                shippingAddress:formValue
            },
            {
                headers :headers
            }
        )
            .then((respnse) => respnse)
            .catch((err) => err)


    }
    function removeCartItem(productId) {

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers:headers
            }
        )
            .then((respnse) => respnse)
            .catch((err) => err)


    }
    function ubdateQuntity(productId, count) {

        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count
            },
            {
                headers:headers
            }
        )
            .then((respnse) => respnse)
            .catch((err) => err)


    }

    function getCartItem() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers :headers
        })

    }


   async function getCart(){
     let data = await getCartItem ()
     setToCart(data.data)
    }
    useEffect(() => {
     getCart()
    }, [])
    return <cartContext.Provider value={{ cart , setToCart , checkOut , addToCart , getCartItem , removeCartItem , ubdateQuntity }}>
        {props.children}
    </cartContext.Provider>
}