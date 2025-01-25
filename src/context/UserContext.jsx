import { createContext, useEffect, useState } from "react";

 export let UserContxet = createContext(0)


 export default function UserContextProvider (props){

  let[userLogin , setUserLogin] = useState(null)
  useEffect(()=>{
    if (localStorage.getItem("userToken")) {
        setUserLogin (localStorage.getItem("userToken"))
    }
  } , [])


return <UserContxet.Provider value={{ userLogin , setUserLogin  }}>

 {props.children}


</UserContxet.Provider>






}