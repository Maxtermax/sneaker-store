import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import Products from "@components/Products/Products"
import ShoppingCar from "@components/ShoppingCar/ShoppingCar";
import { useObserver } from "hermes-io";
import ProductsObservers from '@observers/products';
import theme from '@theme';
import * as contexts from '@contexts';

const sneakerList = [
  {
    id: '1',
    name: 'Jordan',
    image: '/assets/images/jordan_3.webp',
    description: 'Air Jordan 3 Retro OG',
    price: '250'
  },
  {
    id: '2',
    image: '/assets/images/addidas.webp',
    description: 'Bad Bunny Forum Buckle Low sneakers',
    name: 'Adidas Forum',
    price: '200'
  },
]

const productsStore = new Map();
productsStore.set('collection', sneakerList); 

const filterSelectes = (collection) => collection.filter((item) => item.selected);

function App() {
  const [products, setProducts] = useState(productsStore.get('collection'));
  
  const handleRemoveProduct = ({ value: product = {} }) => {
    product.selected = false;
    setProducts([...productsStore.get('collection')]);
  };
  
  const handleAddProduct = ({ value: product = {} }) => {
    product.selected = true;
    setProducts([...productsStore.get('collection')]);
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
      <Products variant='grid' data={products} />
    </ThemeProvider>
  );
}

export default App;
