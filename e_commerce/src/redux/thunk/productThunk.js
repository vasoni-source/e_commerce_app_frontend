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
export const getProductById = createAsyncThunk('productDetail',async(id)=>{
  try {
      console.log("id from product thunk",id);
   
    const res = await axios.get(`http://localhost:5000/product/${id}`,{
 id
    });
    
    console.log("response from api ",res.data);
    
   return res.data;
      
    } catch (error) {
      console.log("error",error)
    }
  
})