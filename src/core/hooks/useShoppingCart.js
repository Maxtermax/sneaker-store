import { useObserver } from 'hermes-io';
import { ShoppingCart as ObserverShoppingCart } from "../observers/ShoppingCart";
import { ShoppingCart as ContextShoppingCart } from "../contexts/ShoppingCart";

export const useShoppingCart = (cb) => {
  const handleUseShoppingCartNotification = (event) => {
    cb?.(event);
  };
  useObserver({
    contexts: [ContextShoppingCart],
    observer: ObserverShoppingCart,
    listener: handleUseShoppingCartNotification,
  });
}
