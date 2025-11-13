import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
export const getAllProducts = createAsyncThunk('product',async()=>{
    try {
        
     
      const res = await axios.get("http://localhost:5000/product",{
   
      });
      
      console.log("response from api ",res.data);
      
     return res.data;
        
      } catch (error) {
        console.log("error",error)
      }
    
})