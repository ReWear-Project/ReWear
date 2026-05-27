import { createContext, useContext, useState } from "react";

// 🔥 IMPORT YOUR EXISTING PRODUCTS
import { products as initialProducts } from "../data/products";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // 🔥 START WITH EXISTING DATA (NOT EMPTY)
  const [products, setProducts] = useState(initialProducts);

  // 🔥 ADD NEW PRODUCT
  const addProduct = (product) => {
    const newProduct = {
      id: Date.now(),
      ...product,
    };

    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }

  return context;
};