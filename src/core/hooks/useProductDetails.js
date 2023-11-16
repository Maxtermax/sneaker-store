import { useObserver } from "hermes-io";
import { ProductDetailsObserver } from "@observers/Zoom";
import { ProductDetailsContext } from "@contexts/Zoom";
import { ChatBotManager as ObserverChatBotManager } from "@observers/ChatBotManager";
import { ChatBotManager as ContextChatBotManager } from "@contexts/ChatBotManager";
import { useState } from "react";
import { OPEN_PRODUCT_DETAILS, CLOSE_PRODUCT_DETAILS, CLOSE_CHAT } from "@core/constants";

export const useProductDetails = () => {
  const [openDialog, setDialog] = useState(false);
  const [image, setImage] = useState(null);
  const handleZoomNotification = (event) => {
    const { value = {} } = event;
    const { type, payload } = value;
    if (type === OPEN_PRODUCT_DETAILS) {
      setDialog(true);
      setImage(payload);
    }
    if (type === CLOSE_PRODUCT_DETAILS) {
      setDialog(false);
      setImage(null);
      ObserverChatBotManager.notify({
        context: ContextChatBotManager,
        value: {
          type: CLOSE_CHAT,
        },
      });
    }
  };
  useObserver({
    contexts: [ProductDetailsContext],
    observer: ProductDetailsObserver,
    listener: handleZoomNotification,
  });
  return { openDialog, setDialog, image };
};
