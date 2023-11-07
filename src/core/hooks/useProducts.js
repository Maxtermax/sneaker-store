import { useState } from 'react';
import { useObserver } from 'hermes-io';
import { ProductsObserver } from "../observers/Product";
import { ProductsContext } from "../contexts/Products";
import productsStore from "@views/store";
import { ADD_PRODUCTS, REMOVE_PRODUCTS } from '@core/constants';

export const useProducts = () => {
  const [products, setProducts] = useState(productsStore.get("collection"));

  const handleRemoveProduct = (product) => {
    const products = [...productsStore.get("collection")].map((item) => {
      if (item.id === product.id) item.selected = false;
      return item;
    });
    setProducts(products);
  };

  const handleAddProduct = (product) => {
    const products = [...productsStore.get("collection")].map((item) => {
      if (item.id === product.id) item.selected = true;
      return item;
    });
    setProducts(products);
  };

  const handleUseProductsNotification = (event) => {
    const { value = '' } = event;
    const { type, payload } = value;
    if (type === ADD_PRODUCTS) return handleAddProduct(payload);
    if (type === REMOVE_PRODUCTS) return handleRemoveProduct(payload);
  };
  useObserver({
    contexts: [ProductsContext],
    observer: ProductsObserver,
    listener: handleUseProductsNotification,
  });
  return { products };
}
