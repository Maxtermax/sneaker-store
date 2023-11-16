import React, { useState } from "react";
import { useObserver } from "hermes-io";
import { ChatBotManager as ObserverChatBotManager } from "@observers/ChatBotManager";
import { ChatBotManager as ContextChatBotManager } from "@contexts/ChatBotManager";
import { ShoppingCart as ContextShoppingCart } from "@contexts/ShoppingCart";
import { ShoppingCart as ObserverShoppingCart } from "@observers/ShoppingCart";
import {
  ADD_PRODUCTS,
  CLOSE_CHAT,
  CLOSE_PRODUCT_DETAILS,
  CLOSE_SHOPPING_CART,
  MESSAGE_DIRECTIONS,
  OPEN_CHAT,
  OPEN_PRODUCT_DETAILS,
  OPEN_SHOPPING_CART,
  PRODUCTS_SNAPSHOT,
  SET_SIZES,
  TAKE_SNAPSHOT,
} from "@core/constants";
import { ProductsObserver } from "@core/observers/Products";
import { ProductsContext } from "@core/contexts/Products";
import { buildMessagePayload, delay, sequence } from "@src/utils/utils";
import { formatDate, s4 } from "@src/utils/formatter";
import { ProductDetailsObserver } from "@core/observers/Zoom";
import { ProductDetailsContext } from "@core/contexts/Zoom";
import { Box, Button, Typography } from "@mui/material";
import Greeting from "@core/views/components/Greating/Greating";
import { ObserverProductsSnapshot } from "@core/observers/ProductsSnapshot";
import { ContextProductsSnapshot } from "@core/contexts/ProductsSnapshot";

export let discardsProducts = [];
export let products = [];

const steps = ({ setMessages, setIsChatEnabled }) => {
  const getProduct = () => {
    let result;
    for (let product of products) {
      const isDiscarded = discardsProducts.some(
        (discard) => discard.id === product.id
      );
      if (isDiscarded) continue;
      if (!product.selected) {
        result = product;
        break;
      }
    }
    return result;
  };

  async function initialMessage() {
    const payload = buildMessagePayload();
    setMessages((messages) => [
      ...messages,
      {
        ...payload,
        content: "Sure, check this product 🔥:",
      },
    ]);
    await delay(400);
  }
  async function showProduct(product) {
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
  }
  async function addProductMessage(product) {
    const payload = buildMessagePayload();
    const { bio, description, name } = product;
    setMessages((messages) => [
      ...messages,
      {
        ...payload,
        content: (
          <Box>
            <Typography variant="h6" display="block" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body1" display="block" gutterBottom>
              {description}
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              {bio}
            </Typography>
          </Box>
        ),
      },
    ]);
    return product;
  }
  async function closeShoppingCart() {
    await delay(400);
    ObserverShoppingCart.notify({
      context: ContextShoppingCart,
      value: {
        type: CLOSE_SHOPPING_CART,
      },
    });
  }
  async function suggetsNewRecommendation() {
    const payload = buildMessagePayload();
    setMessages((messages) => [
      ...messages,
      {
        ...payload,
        content: "How about this new recommendation ?",
      },
    ]);
  }
  async function wraupProduct(currentProduct) {
    await delay(1000);
    const payload = buildMessagePayload();
    setIsChatEnabled(false);

    const handleConfirmation = (event, id) => {
      event.target.disabled = true;
      document.getElementById(`reject-${id}`).disabled = true;
      ProductsObserver.notify({
        context: ProductsContext,
        value: {
          type: ADD_PRODUCTS,
          payload: currentProduct,
        },
      });
      ProductDetailsObserver.notify({
        context: ProductDetailsContext,
        value: {
          type: CLOSE_PRODUCT_DETAILS,
        },
      });
      setIsChatEnabled(true);
      delay(1000);
      ObserverShoppingCart.notify({
        context: ContextShoppingCart,
        value: {
          type: OPEN_SHOPPING_CART,
        },
      });
    };
    const handleReject = (event, id) => {
      event.target.disabled = true;
      document.getElementById(`confirm-${id}`).disabled = true;
      setIsChatEnabled(false);
      sequence(function* applySteps() {
        discardsProducts.push(currentProduct);
        const product = getProduct();
        yield async () => !product && couldNotFoundRecommendation();
        yield () => closeShoppingCart();
        yield () => suggetsNewRecommendation();
        yield () => showProduct(product);
        yield () => addProductMessage(product);
        yield () => wraupProduct(product);
      });
    };
    setMessages((messages) => [
      ...messages,
      {
        ...payload,
        content: (
          <Box>
            <Typography variant="body1" display="block" gutterBottom>
              Would you like to add it to the shopping cart ? 🤔
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: "10px",
                marginTop: "5px",
                marginBottom: "5px",
                "& button:disabled": {
                  opacity: 0.5,
                },
              }}
            >
              <Button
                id={`confirm-${payload.id}`}
                variant="outlined"
                onClick={(event) => handleConfirmation(event, payload.id)}
              >
                Yes
              </Button>
              <Button
                id={`reject-${payload.id}`}
                variant="outlined"
                onClick={(event) => handleReject(event, payload.id)}
              >
                No
              </Button>
            </Box>
          </Box>
        ),
      },
    ]);
  }
  async function couldNotFoundRecommendation() {
    const payload = buildMessagePayload();
    setMessages((messages) => [
      ...messages,
      {
        ...payload,
        content: "Could not found recommendations 😔",
      },
    ]);
    return Promise.reject();
  }
  sequence(async function* applySteps() {
    const product = getProduct();
    yield async () => !product && couldNotFoundRecommendation();
    yield () => initialMessage();
    yield () => showProduct(product);
    yield () => addProductMessage(product);
    yield () => wraupProduct(product);
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
  const handleChatBotManagerNotification = (event) => {
    const { value } = event;
    const { type, payload } = value;
    if (type === OPEN_CHAT) {
      ObserverProductsSnapshot.notify({
        context: ContextProductsSnapshot,
        value: {
          type: TAKE_SNAPSHOT,
        },
      });
      return cb?.({ isOpen: true });
    }
    if (type === PRODUCTS_SNAPSHOT) products = payload;
    if (type === CLOSE_CHAT) {
      setMessages([
        {
          id: s4(),
          direction: MESSAGE_DIRECTIONS.IN,
          time: formatDate(new Date()),
          content: <Greeting options={options} />,
        },
      ]);
      setIsChatEnabled(true);
      discardsProducts = [];
      products = [];
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
    listener: handleChatBotManagerNotification,
  });
  return { runSquence, isChatEnabled, messages, setMessages };
};
