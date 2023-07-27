import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import Products from "@features/Products/Products";
import productsStore from "@views/store";
import ShoppingCar from "@components/ShoppingCar/ShoppingCar";
import { useObserver } from "hermes-io";
import ProductsObservers from "@observers/products";
import theme from "@theme";
import * as contexts from "@contexts";

const filterSelectes = (collection) =>
  collection.filter((item) => item.selected);

function App() {
  const [products, setProducts] = useState(productsStore.get("collection"));

  const handleRemoveProduct = ({ value: product = {} }) => {
    const products = [...productsStore.get("collection")].map((item) => {
      if (item.id === product.id) {
        item.selected = false;
      }
      return item;
    });
    setProducts(products);
  };

  const handleAddProduct = ({ value: product = {} }) => {
    const products = [...productsStore.get("collection")].map((item) => {
      item.selected = item.id === product.id;
      return item;
    });
    setProducts(products);
  };

  useObserver({
    observer: ProductsObservers.add,
    listener: handleAddProduct,
    contexts: [contexts.products],
  });

  useObserver({
    observer: ProductsObservers.remove,
    listener: handleRemoveProduct,
    contexts: [contexts.shoppingCar, contexts.products],
  });

  return (
    <ThemeProvider theme={theme}>
      <ShoppingCar data={filterSelectes(products)} />
      <Products data={products} />
    </ThemeProvider>
  );
}

export default App;
