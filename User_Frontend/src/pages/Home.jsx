import React, { useEffect } from 'react'
import { FeaturedCategories, FeaturedProducts, Footer, HomeSlider, NewArrivals, PopularProducts, ServiceSection, SubscribeSection } from '../components'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setUserData } from '../redux/authSlice';
import { getUserDetails } from '../services/authServices';

const Home = () => {
  // const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  

  // const fetchUserDetails = async () => {
  //   try {
  //     const response = await getUserDetails(token);
  //     console.log(response);
  //     if(response.success){
  //       dispatch(setUserData(response.user));
  //       dispatch(setIsAuthenticated(true));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(()=> {
  //   if(token) {
  //     fetchUserDetails();
  //   }
  // }, [token])

  // useEffect(() => {
  //   const token = localStorage.getItem("token"); // Get JWT from storage or state

  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       console.log(decodedToken); // Contains user details
  //       dispatch(setIsAuthenticated(true));
  //       dispatch(setUserData({
  //         id: decodedToken.id,
  //         email: decodedToken.email,
  //         name: decodedToken.name,
  //         role: decodedToken.role,
  //         phone: decodedToken.phone,
  //         address: decodedToken.address,
  //       }));

  //     } catch (error) {
  //       console.error("Invalid token:", error);
  //     }
  //   }
  // }, []);

  return (
    <div>
      <HomeSlider/>
      <FeaturedCategories/>
      <PopularProducts/>
      <NewArrivals/>
      <FeaturedProducts/>
     
    </div>
    
  )
}

export default Home