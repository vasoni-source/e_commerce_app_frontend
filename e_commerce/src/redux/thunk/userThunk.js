import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateUserField = createAsyncThunk(
    "update_userField",
    async (data, { rejectWithValue }) => {

        console.log("formdat from thunk", data);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.patch("https://e-commerce-q22t.onrender.com/user/update", 
                data,{
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
            );

            
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to upadte the field Please try again."
            );
        }
    }
);
export default updateUserField
