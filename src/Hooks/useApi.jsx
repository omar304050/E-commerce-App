import React from 'react'
import {useQuery} from "@tanstack/react-query";
import axios from 'axios';
export default function useApi(endPoint ) {

    function GetApi(){

        return axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}    `)
    }
let ApiInfo = useQuery({
    queryKey:[endPoint],
    queryFn:GetApi
})
    
  return ApiInfo
}
