import React from "react";
import { ThemeProvider } from "styled-components";
import Products from "@features/Products/Products";
import ShoppingCart from "@features/ShoppingCart/ShoppingCart";
import theme from "@theme";
import { useProducts } from './hooks/useProducts';

const filterSelectes = (collection) =>
  collection.filter((item) => item.selected);

function App() {
  const { products } = useProducts();
  return (
    <ThemeProvider theme={theme}>
      <ShoppingCart data={filterSelectes(products)} />
      <Products data={products} />
    </ThemeProvider>
  );
}

export default App;
