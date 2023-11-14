import React, { useRef } from "react";
import { ThemeProvider } from "styled-components";
import Products from "@features/Products/Products";
import Chat from "@features/Chat/Chat";
import ShoppingCart from "@features/ShoppingCart/ShoppingCart";
import theme from "@theme";
import { useProducts } from "./hooks/useProducts";
import { useChatBotManager } from "./hooks/useChatBotManager";
import { Box } from "@mui/material";
import { DRAWER_WIDTH } from "./constants";

const filterSelectes = (collection) =>
  collection.filter((item) => item.selected);

function App() {
  const { products } = useProducts();
  const wrapperRef = useRef(null);
  useChatBotManager(({ isOpen }) => {
    const hasWrapperRef = wrapperRef.current !== null;
    if (!hasWrapperRef) return;
    let width = "100%";
    if (isOpen) width = `calc(100% - ${DRAWER_WIDTH})`;
    wrapperRef.current.style.width = width;
  });
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        id="main"
        ref={wrapperRef}
        sx={{ transition: "all 0.35s ease-in-out" }}
      >
        <ShoppingCart data={filterSelectes(products)} />
        <Products data={products} />
      </Box>
      <Chat />
    </ThemeProvider>
  );
}

export default App;
