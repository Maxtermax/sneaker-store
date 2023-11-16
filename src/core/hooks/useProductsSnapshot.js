import { PRODUCTS_SNAPSHOT, TAKE_SNAPSHOT } from "@core/constants";
import { ContextProductsSnapshot } from "@core/contexts/ProductsSnapshot";
import { ObserverProductsSnapshot } from "@core/observers/ProductsSnapshot";
import { ChatBotManager as ObserverChatBotManager } from "@observers/ChatBotManager";
import { ChatBotManager as ContextChatBotManager } from "@contexts/ChatBotManager";
import { useObserver } from "hermes-io";

export const useProductsSnapshot = (products) => {
  const handleProductsSnapshotNotification = (event) => {
    const { value } = event;
    const { type } = value;
    if (type === TAKE_SNAPSHOT) {
      ObserverChatBotManager.notify({
        context: ContextChatBotManager,
        value: {
          type: PRODUCTS_SNAPSHOT,
          payload: products,
        },
      });
    }
  };
  useObserver({
    contexts: [ContextProductsSnapshot],
    observer: ObserverProductsSnapshot,
    listener: handleProductsSnapshotNotification,
  });
};
