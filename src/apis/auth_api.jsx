import axiosInstance from "../utils/axiosInstance";

const auth = {
  registerApi(data) {
    return axiosInstance.post("/auth/signup", data);
  },

  loginApi(data) {
    return axiosInstance.post("/auth/signin" , data)
  },

  ForgetPasswordApi(data){
   return axiosInstance.post("/auth/forgotPasswords" , data)
  } ,

  verifyResetCodeApi(data){
    return axiosInstance.post("/auth/verifyResetCode", data)
  },

  newPasswordApi(data){
    return axiosInstance.put("/auth/resetPassword" , data )
  }
};

export default auth;
