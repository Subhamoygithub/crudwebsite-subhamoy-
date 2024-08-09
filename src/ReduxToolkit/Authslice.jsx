import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import axiosInstance from "../AxiosHelper/Axiosinsta";

// login 

export const Loginapi = createAsyncThunk('login/fetch', async(data)=>{
    try{
        const responce = await axiosInstance.post('/user/signin',data)
        // console.log("res",responce);
        if (responce && responce?.data?.status === 200){
            console.log("res",responce?.data?.status);
            return responce?.data;
        }else{
            toast.error(responce?.data?.message)
        }
    } catch (error){
        toast.error(error?.responce?.data?.message)
    }
})
export const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        loginitem: [],
        loading:false,
        LogoutToggle:false
    },
    reducers:{
        Removefun : (state)=>{
            state.loading=false
            state.LogoutToggle=false
            localStorage.removeItem("token")
            localStorage.removeItem("Name")
        },
        check_token: (state, { payload }) => {
            let token = localStorage.getItem("token");
            console.log("tok",token);
            if (token !== null && token !== undefined) {
        
                state.LogoutToggle = true;
            }
          }

    },
    extraReducers: (builder) => {
        builder
         .addCase(Loginapi.pending, (state, action) => {
            state.login_status = "loading";
            state.loading=true
          })
          .addCase(Loginapi.fulfilled, (state,{payload}) => {
              if(payload?.status==200){
              state.login_status = "idle";
              state.LogoutToggle = true 
              localStorage.setItem("token",payload?.token);
              localStorage.setItem("Name",payload?.data?.first_name);
              state.loading="success"
              toast(payload?.message)
             }else{
              if(payload?.status==201){
                  toast(payload?.message)
                 }
             }
             })
          .addCase(Loginapi.rejected, (state, {payload}) => {
            // if(payload?.status==201){
            //   toast(payload?.message)
            //  }
           
          })
    
    
          
      },
    });
    export const {Removefun,check_token}= LoginSlice.actions;