import { Box, Tab, Tabs } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productsServices";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#00A63E", // green
    },
    secondary: {
      main: "#ff4081", // Pink
    },
    background: {
      default: "#f5f5f5", // Light gray
      paper: "#ffffff", // White paper background
    },
    text: {
      primary: "#000000", // Black text
      secondary: "#666666", // Gray text
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
  },
});

const PopularProducts = () => {
  const catList = [
    "fashion",
    "footwear",
    "electronics",
    "accessories",
    "appliances",
  ];
  const [catIndex, setCatIndex] = useState(0);

  const [category, setCategory] = useState("fashion"); 
  const [popularProducts, setPopularProducts] = useState([]);

  // const popularProducts = Products.filter(
  //   (p) => p.category == category.toLowerCase()
  // ).slice(0, 5);

  const fetchProducts = async () => {
    const response = await getProducts({category, limit: 10});
    console.log(response.data);
    setPopularProducts(response.data);
    
  }

  useEffect(()=>{
    fetchProducts()
  }, [category]);

  const handleTabChange = (event, newValue) => {
    // console.log(newValue);
    setCatIndex(newValue);
    const cat = catList[newValue];
    // console.log(cat);

    setCategory(cat);
  };

  return (
    <div className=" my-10 w-full px-4 md:px-10 py-4">
      <div className="flex items-center justify-between  mb-2 md:mb-6">
        <h2 className="text-xl md:text-2xl font-semibold ">
          Popular Products
        </h2>
        <div className="hidden md:block">
          <ThemeProvider theme={theme}>
            <Box sx={{  borderColor: "divider" }}>
              <Tabs
                value={catIndex}
                textColor="primary"
                indicatorColor="primary"
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                {catList.map((cat, index) => (
                  <Tab label={cat} key={index} />
                ))}
              </Tabs>
            </Box>
          </ThemeProvider>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
        {popularProducts?.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
