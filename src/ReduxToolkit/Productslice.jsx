import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosHelper/Axiosinsta";
import { toast } from "react-toastify";

const initialState = {
    list :[{}],
    totalpage :[{}],
    getiddetails:[{}],
    redirect: null,
    redirectUpdate:null,
    loading:false,
};

export const productlist = createAsyncThunk('prolist/fetch',async(formdata)=>{
let res = await axiosInstance.post ("/product/list",formdata)
let resData = res?.data;
return resData;
})

export const productCre = createAsyncThunk ('create/product',async (formdata)=>{
    let res = await axiosInstance.post ("/product/create",formdata)
    let resData = res?.data;
    return resData;
})

export const getproduct = createAsyncThunk("get/product",async(id)=>{
    let res = await axiosInstance.get(`product/detail/${id}`);
    console.log("getdata",res);
    let resData = res?.data

    return resData
    
})
export const updateproduct = createAsyncThunk("update/product",async(formdata)=>{
    let res = await axiosInstance.post("product/update",formdata);
    console.log("getdata",res);
    toast(res?.data?.message)
    let resData = res?.data?.data
    
    return resData
    
})

export const deleteProduct=createAsyncThunk('remove',async (id)=>{
    try {
  
        return await axiosInstance.post(`product/remove`,{id})
    }
    catch (error) {
        console.log('Error while calling getUsers API', error)
    }
  }) 


export const ProductSlice = createSlice({
    name: "crudproduct",
    initialState,

    extraReducers:(builder)=>{
        builder
        .addCase (productlist.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase (productlist.fulfilled,(state,{payload})=>{
            state.status = "idle";
            state.list = payload?.data;
        })
        .addCase(productlist.rejected,(state,action)=>{
            state.status="error"
        })
        

        .addCase(productCre.pending,(state,action)=>{
            state.status = "loading";
            state.loading=true
        })
        .addCase(productCre.fulfilled,(state, {payload})=>{
            state.status = "idle";
            state.loading="success"
            localStorage.setItem("title",payload?.data.title)
            toast(payload?.message)
        })
        .addCase(productCre.rejected,(state,action)=>{
            state.status = "error";
        })

        .addCase(getproduct.pending,(state,action)=>{
            state.status="loading";
        })
        
        .addCase(getproduct.fulfilled,(state,{payload})=>{
            state.status="succes";
            state.getiddetails = payload?.data
            // toast(payload?.message)
        })
        .addCase(getproduct.rejected,(state,action)=>{
            state.status="error";
            
        })

        .addCase(updateproduct.pending,(state,action)=>{
            state.status="loading";
            state.loading=true
        })
        
        .addCase(updateproduct.fulfilled,(state,{payload})=>{
            state.status="idle";
            state.loading="success"
            console.log("subha",payload);
            toast(payload?.message)
        })
        .addCase(updateproduct.rejected,(state,action)=>{
            state.status="error";
            
        })

    }
})