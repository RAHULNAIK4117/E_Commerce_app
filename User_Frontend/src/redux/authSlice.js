import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        userData: null
    },
    reducers:{
        setIsAuthenticated: (state, action) =>{
            state.isAuthenticated = action.payload
        },
        setUserData: (state, action) =>{
            state.userData = action.payload
        }
    }
})

export const { setIsAuthenticated, setUserData } = authSlice.actions;
export default authSlice.reducer;