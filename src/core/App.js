import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import Products from "@components/Products/Products";
import ShoppingCar from "@components/ShoppingCar/ShoppingCar";
import { useObserver } from "hermes-io";
import ProductsObservers from "@observers/products";
import theme from "@theme";
import * as contexts from "@contexts";

const sneakerList = [
  {
    id: "1",
    name: "Jordan",
    images: [
      "/assets/images/jordan_1.png",
      "/assets/images/jordan_2.png",
      "/assets/images/jordan_4.png",
    ],
    description: "Air Jordan 3 Retro OG",
    discount: 0,
    sizes: [8, 8.5, 9, 10],
    price: 250,
    value: 250,
  },
  {
    id: "2",
    images: [
      "/assets/images/addidas_1.png",
      "/assets/images/addidas_2.png",
      "/assets/images/addidas_3.png",
    ],
    description: "Bad Bunny Forum Buckle Low sneakers",
    discount: 30,
    name: "Adidas Forum",
    price: 200,
    value: 140,
    sizes: [8, 8.5, 9, 10],
  },
];

const productsStore = new Map();
productsStore.set("collection", sneakerList);

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
      <Products variant="grid" data={products} />
    </ThemeProvider>
  );
}

export default App;
