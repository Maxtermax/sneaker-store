import { useState } from 'react';
import { useObserver } from 'hermes-io';
import { ProductsObserver } from "../observers/Products";
import { ProductsContext } from "../contexts/Products";
import productsStore from "@views/store";
import { ADD_PRODUCTS, REMOVE_PRODUCTS } from '@core/constants';

export const useProducts = () => {
  const [products, setProducts] = useState(productsStore.get("collection"));

  const removeProduct = (product) => {
    const products = [...productsStore.get("collection")].map((item) => {
      if (item.id === product.id) item.selected = false;
      return item;
    });
    setProducts(products);
  };

  const addProduct = (product) => {
    const products = [...productsStore.get("collection")].map((item) => {
      if (item.id === product.id) item.selected = true;
      return item;
    });
    setProducts(products);
  };

  const handleUseProductsNotification = (event) => {
    const { value = '' } = event;
    const { type, payload } = value;
    if (type === ADD_PRODUCTS) return addProduct(payload);
    if (type === REMOVE_PRODUCTS) return removeProduct(payload);
  };
  useObserver({
    contexts: [ProductsContext],
    observer: ProductsObserver,
    listener: handleUseProductsNotification,
  });
  return { products };
}
