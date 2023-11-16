import { useState } from "react";
import { useObserver } from "hermes-io";
import { ProductsObserver } from "@observers/Products";
import { ProductsContext } from "@contexts/Products";
import { ChatBotManager as ObserverChatBotManager } from "@observers/ChatBotManager";
import { ChatBotManager as ContextChatBotManager } from "@contexts/ChatBotManager";
import productsStore from "@views/store";
import {
  ADD_PRODUCTS,
  PRODUCTS_SNAPSHOT,
  REMOVE_PRODUCTS,
} from "@core/constants";
import { useProductsSnapshot } from "./useProductsSnapshot";

export const useProducts = () => {
  const [products, setProducts] = useState(productsStore.get("collection"));
  useProductsSnapshot(products);
  const removeProduct = (product) => {
    const products = [...productsStore.get("collection")].map((item) => {
      if (item.id === product.id) item.selected = false;
      return item;
    });
    setProducts(products);
    ObserverChatBotManager.notify({
      context: ContextChatBotManager,
      value: {
        type: PRODUCTS_SNAPSHOT,
        payload: products,
      },
    });
  };

  const addProduct = (product) => {
    const products = [...productsStore.get("collection")].map((item) => {
      if (item.id === product.id) item.selected = true;
      return item;
    });
    setProducts(products);
    ObserverChatBotManager.notify({
      context: ContextChatBotManager,
      value: {
        type: PRODUCTS_SNAPSHOT,
        payload: products,
      },
    });
  };

  const handleUseProductsNotification = (event) => {
    const { value = "" } = event;
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
};
