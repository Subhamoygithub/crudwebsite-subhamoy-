import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { LoginSlice } from "./Authslice";
import { ProductSlice } from "./Productslice";



export const Store = configureStore({
        reducer:{
           Auth:LoginSlice.reducer,
           Crud:ProductSlice.reducer
        },
})