import axios from "axios";
import { createContext } from "react";

export let cartContext = createContext()


export default function CartContextProvider(props) {
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
    function removeCartItem(productId) {

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers
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
                headers
            }
        )
            .then((respnse) => respnse)
            .catch((err) => err)


    }

    function getCartItem() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })

    }

    return <cartContext.Provider value={{ addToCart, getCartItem, removeCartItem, ubdateQuntity }}>
        {props.children}
    </cartContext.Provider>
}