import React from "react";
import { ThemeProvider } from "styled-components";
import Products from "@features/Products/Products";
import ShoppingCar from "@features/ShoppingCar/ShoppingCar";
import theme from "@theme";
import { useProducts } from './hooks/useProducts';

const filterSelectes = (collection) =>
  collection.filter((item) => item.selected);

function App() {
  const { products } = useProducts();
  return (
    <ThemeProvider theme={theme}>
      <ShoppingCar data={filterSelectes(products)} />
      <Products data={products} />
    </ThemeProvider>
  );
}

export default App;
