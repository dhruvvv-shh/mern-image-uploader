import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPhotos = createAsyncThunk(
    'photos/getPhotos',
    async () => {
        console.log('insisss')
        const response = await axios.get('http://localhost:8080/api/view/images');
        return response.data
    }
)

export const gallerySlice = createSlice({
    name: 'gallery',
    initialState: {
        photos: [],
        isloading: false
    },
    extraReducers: {
        [getPhotos.pending]: (state) => {
            state.isloading = true
        },
        [getPhotos.fulfilled]: (state, action) => {
            state.photos = action.payload;
            state.isloading = false;
        },
        [getPhotos.rejected]: (state) => {
            state.isloading = false
        }
    }
})

export default gallerySlice.reducer