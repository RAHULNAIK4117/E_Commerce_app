import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ProductCard } from "../components";
import { 
  Breadcrumbs, 
  Typography, 
  Button, 
  Checkbox, 
  FormControlLabel,
  FormGroup,
  Divider
} from "@mui/material";
import { getProducts } from "../services/productsServices";

const Product = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showProducts, setShowProducts] = useState([]);
  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");

  const categories = [
    { name: "Fashion", subcategories: [] },
    { name: "Electronics", subcategories: [] },
    { name: "Footwear", subcategories: [] },
    { name: "Groceries", subcategories: [] },
    { name: "Appliances", subcategories: [] }
  ];

  const fetchAndSetProducts = async () => {
    const response = await getProducts({ 
      category, 
      subCategory, 
      search, 
      sort 
    });
    
    // Apply client-side sorting if needed
    let sortedProducts = [...response.data];
    if (sort === "low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    
    setShowProducts(sortedProducts);
  };

  useEffect(() => {
    fetchAndSetProducts();
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  }, [category, subCategory, search, sort]);

  const handleSort = (order) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", order);
    navigate(`/products?${params.toString()}`);
  };

  const handleCategory = (cat, subCat) => {
    const params = new URLSearchParams();
    params.set("category", cat.toLowerCase());
    if (subCat) {
      params.set("subCategory", subCat.toLowerCase().replace(/\s+/g, '-'));
    }
    navigate(`/products?${params.toString()}`);
  };

  const isCategoryActive = (catName) => {
    return category === catName.toLowerCase();
  };

  const isSubCategoryActive = (subCatName) => {
    return subCategory === subCatName.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="w-full px-4 md:px-10 py-5">
      <div className="bg-green-200 h-28 rounded-xl w-full mb-5 flex flex-col justify-center gap-2 px-10">
        <h2 className="text-3xl capitalize font-semibold">
          {category ? category : "All Products"}
        </h2>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="inherit">
            <Link to="/">Home</Link>
          </Typography>
          <Typography color="inherit">
            <Link to="/products">Products</Link>
          </Typography>
          {category && (
            <Typography color="inherit">
              <Link to={`/products?category=${category}`} className="capitalize">
                {category}
              </Link>
            </Typography>
          )}
          {subCategory && (
            <Typography color="inherit">
              <Link
                to={`/products?category=${category}&subCategory=${subCategory}`}
                className="capitalize"
              >
                {subCategory}
              </Link>
            </Typography>
          )}
          {search && <Typography color="inherit">{search}</Typography>}
        </Breadcrumbs>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="bg-white w-full lg:w-[270px] hidden lg:block flex-shrink-0 asidebarfilter p-4 shadow-md rounded-lg">
          <div className="mb-6">
            <Typography variant="h6" className="font-semibold mb-3">
              Sort by Price
            </Typography>
            <div className="flex flex-col gap-2">
              <Button
                variant={sort === "low-to-high" ? "contained" : "outlined"}
                color={sort === "low-to-high" ? "primary" : "inherit"}
                size="small"
                fullWidth
                onClick={() => handleSort("low-to-high")}
                className="text-left justify-start"
              >
                Low to High
              </Button>
              <Button
                variant={sort === "high-to-low" ? "contained" : "outlined"}
                color={sort === "high-to-low" ? "primary" : "inherit"}
                size="small"
                fullWidth
                onClick={() => handleSort("high-to-low")}
                className="text-left justify-start"
              >
                High to Low
              </Button>
            </div>
          </div>

          <Divider className="my-4" />

          <div className="mb-6">
            <Typography variant="h6" className="font-semibold mb-3">
              CATEGORIES
            </Typography>
            <FormGroup>
              {categories.map((cat) => (
                <div key={cat.name} className="mb-2">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isCategoryActive(cat.name)}
                        onChange={() => handleCategory(cat.name)}
                        color="primary"
                      />
                    }
                    label={<span className="font-medium">{cat.name}</span>}
                  />
                  
                  {cat.subcategories.length > 0 && (
                    <div className="ml-8 mt-1">
                      {cat.subcategories.map((subcat) => (
                        <FormControlLabel
                          key={subcat}
                          control={
                            <Checkbox
                              checked={isSubCategoryActive(subcat)}
                              onChange={() => handleCategory(cat.name, subcat)}
                              color="primary"
                              size="small"
                            />
                          }
                          label={<span className="text-sm">{subcat}</span>}
                          className="mb-1"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </FormGroup>
          </div>
        </div>

        <div className="w-full">
          <div className="py-4 font-semibold text-gray-600">
            We found{" "}
            <span className="text-[#00A63E] text-lg">
              {showProducts?.length}
            </span>{" "}
            items for you!
          </div>
          <div className="w-full min-h-[500px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {showProducts?.length ? (
              showProducts.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))
            ) : (
              <div className="w-full flex col-span-full justify-center items-center h-full">
                <h2 className="text-gray-600 text-xl">
                  No Products found for your search!
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;