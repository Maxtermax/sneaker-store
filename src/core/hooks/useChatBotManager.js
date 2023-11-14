import React, { useState } from "react";
import { useObserver } from "hermes-io";
import { ChatBotManager as ObserverChatBotManager } from "../observers/ChatBotManager";
import { ChatBotManager as ContextChatBotManager } from "../contexts/ChatBotManager";
import { ShoppingCart as ContextShoppingCart } from "../contexts/ShoppingCart";
import { ShoppingCart as ObserverShoppingCart } from "../observers/ShoppingCart";
import {
  ADD_PRODUCTS,
  CLOSE_CHAT,
  CLOSE_PRODUCT_DETAILS,
  MESSAGE_DIRECTIONS,
  OPEN_CHAT,
  OPEN_PRODUCT_DETAILS,
  OPEN_SHOPPING_CART,
  SET_SIZES,
} from "@core/constants";
import { ProductsObserver } from "@core/observers/Products";
import { ProductsContext } from "@core/contexts/Products";
import { delay, sequence } from "@src/utils/utils";
import { formatDate, s4 } from "@src/utils/formatter";
import { ProductDetailsObserver } from "@core/observers/Zoom";
import productsStore from "@core/views/store";
import { ProductDetailsContext } from "@core/contexts/Zoom";
import { Button } from "@mui/material";
import Greeting from "@core/views/components/Greating/Greating";

const buildMessagePayload = () => ({
  id: s4(),
  direction: MESSAGE_DIRECTIONS.IN,
  time: formatDate(new Date()),
});

const steps = ({ setMessages, setIsChatEnabled }) => {
  const collection = productsStore.get("collection");
  sequence(async function* applySteps() {
    yield async function initMessage() {
      const payload = buildMessagePayload();
      setMessages((messages) => [
        ...messages,
        {
          ...payload,
          content:
            "Sure, here is a list of the products that i can recommend you.",
        },
      ]);
      await delay(400);
    };

    yield async function openProduct() {
      const product = collection[0];
      const { sizes, discount, images } = product;
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const size = vw <= SET_SIZES.MEDIUM ? SET_SIZES.MEDIUM : SET_SIZES.LARGE;
      ProductDetailsObserver.notify({
        value: {
          type: OPEN_PRODUCT_DETAILS,
          payload: {
            isOpenFromChat: true,
            sizes,
            thumbnails: images[SET_SIZES.SMALL],
            data: images[size],
            discount,
          },
        },
        context: ProductDetailsContext,
      });
      await delay(1000);
      return product;
    };

    yield async function addProductMessage(product) {
      const payload = buildMessagePayload();
      const { bio, description, name } = product;
      setMessages((messages) => [
        ...messages,
        {
          ...payload,
          content: (
            <div>
              <h1>{name}</h1>
              <p>{description}</p>
              <p>{bio}</p>
            </div>
          ),
        },
      ]);
      return product;
    };

    yield async function disableChatForm(product) {
      await delay(1000);
      const payload = buildMessagePayload();
      setIsChatEnabled(false);
      const handleConfirmation = () => {
        // eslint-disable-next-line no-debugger
        ProductsObserver.notify({
          context: ProductsContext,
          value: {
            type: ADD_PRODUCTS,
            payload: product,
          },
        });
        ProductDetailsObserver.notify({
          context: ProductDetailsContext,
          value: {
            type: CLOSE_PRODUCT_DETAILS,
          },
        });
        const payload = buildMessagePayload();
        setMessages((messages) => [
          ...messages,
          {
            ...payload,
            content: "Done ✅",
          },
        ]);
        setIsChatEnabled(true);
        ObserverShoppingCart.notify({
          context: ContextShoppingCart,
          value: {
            type: OPEN_SHOPPING_CART,
          },
        });
      };
      setMessages((messages) => [
        ...messages,
        {
          ...payload,
          content: (
            <div>
              <p>Would you like to add it to the shopping cart ? 🤔 </p>
              <Button onClick={handleConfirmation}>Yes</Button>
              <Button>No</Button>
            </div>
          ),
        },
      ]);
    };
  });
};

export const options = [
  {
    id: "RECOMMEND_PRODUCT",
    keywords: ["recommend"],
    description: "Recommend products.",
    steps,
  },
];

export const useChatBotManager = (cb) => {
  const [isChatEnabled, setIsChatEnabled] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: s4(),
      direction: MESSAGE_DIRECTIONS.IN,
      time: formatDate(new Date()),
      content: <Greeting options={options} />,
    },
  ]);
  const handleUseChatBotManagerNotification = (event) => {
    const { value } = event;
    const { type } = value;
    if (type === OPEN_CHAT) return cb?.({ isOpen: true });
    if (type === CLOSE_CHAT) {
      setMessages([
        {
          id: s4(),
          direction: MESSAGE_DIRECTIONS.IN,
          time: formatDate(new Date()),
          content: <Greeting options={options} />,
        },
      ]);
      setIsChatEnabled(false);
      return cb?.({ isOpen: false });
    }
  };
  const runSquence = (input = "") => {
    const option = options.find((option) => option.keywords.includes(input));
    if (option) {
      option.steps({ setMessages, setIsChatEnabled });
    }
  };
  useObserver({
    contexts: [ContextChatBotManager],
    observer: ObserverChatBotManager,
    listener: handleUseChatBotManagerNotification,
  });
  return { runSquence, isChatEnabled, messages, setMessages };
};
