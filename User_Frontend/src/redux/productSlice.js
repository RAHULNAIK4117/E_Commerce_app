import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "auth",
    initialState: {
        products: [],
        popularProducts: [],
        featuredProducts: [],
        newArrivals: [],
        homeBanners: [],
    },
    reducers:{
        
    }
})

export const { setIsAuthenticated, setUserData } = productSlice.actions;
export default productSlice.reducer;