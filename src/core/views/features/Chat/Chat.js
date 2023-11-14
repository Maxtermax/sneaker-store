import React, { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import {
  CLOSE_CHAT,
  CLOSE_SHOPPING_CART,
  DRAWER_WIDTH,
  MESSAGE_DIRECTIONS,
  OPEN_CHAT,
  OPEN_SHOPPING_CART
} from "@core/constants";
import { ChatBotManager as ObserverChatBotManager } from "@core/observers/ChatBotManager";
import { ChatBotManager as ContextChatBotManager } from "@core/contexts/ChatBotManager";
import theme from "@core/theme";
import { ShoppingCart as ObserverShoppingCart } from "@core/observers/ShoppingCart";
import { ShoppingCart as ContextShoppingCart } from "@core/contexts/ShoppingCart";
import { formatDate, s4 } from "@src/utils/formatter";
import { List, ListItem, Typography } from "@mui/material";

const options = [
  {
    id: "RECOMMEND_PRODUCT",
    keywords: ["recommend"],
    description: "Recommend products.",
    steps: () => null
  },
  {
    id: "SEARCH_PRODUCT",
    keywords: ["search"],
    description: "Search product by: name, price, size, discount, category.",
    steps: () => null
  },
  {
    id: "ADD_REMOVE_PRODUCT",
    keywords: ["add", "remove", "product"],
    description: "Add/remove product to shopping cart.",
    steps: () => null
  }
];

const Greeting = () => {
  return (
    <Box>
      <Typography variant="body1" display="block" gutterBottom>
        Welcome!! i am BOB the BOT you virtual assistant 😊, here the list of
        things that i can do for you:
      </Typography>
      <List>
        {options.map(({ id, description }, index) => (
          <ListItem key={id}>
            <Typography variant="body1" display="block" gutterBottom>
              {index + 1}- {description}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Typography variant="body1" display="block" gutterBottom>
        Prompt example: show me the most popular jordans in size 9.
      </Typography>
    </Box>
  );
};

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      id: s4(),
      direction: MESSAGE_DIRECTIONS.IN,
      time: formatDate(new Date()),
      content: <Greeting />
    }
  ]);
  const handleSubmit = (text = "") => {
    const value = { type: "" };
    let direction = MESSAGE_DIRECTIONS.OUT;

    setMessages(prevValue => {
      const date = formatDate(new Date());
      const message = {
        id: s4(),
        direction,
        content: text,
        time: date
      };
      return [...prevValue, message];
    });
    /*
    if (text.includes("open")) value.type = OPEN_SHOPPING_CART;
    if (text.includes("close")) value.type = CLOSE_SHOPPING_CART;
    ObserverShoppingCart.notify({
      value,
      context: ContextShoppingCart
    });
    */
  };
  return (
    <Box>
      <Messages data={messages} />
      <MessageForm onSubmit={handleSubmit} />
    </Box>
  );
}

function FabButton({ onClick }) {
  return (
    <Box>
      <Fab
        onClick={onClick}
        size="large"
        sx={{
          background: theme.colors.secondary,
          color: "white",
          bottom: "40px",
          position: "fixed",
          right: "40px",
          "& svg": {
            color: theme.colors.fifth
          }
        }}
      >
        <MarkChatUnreadOutlinedIcon />
      </Fab>
    </Box>
  );
}

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const handleDrawerDisplayToggle = () => {
    const newValue = !isOpen;
    setIsOpen(newValue);
    const type = newValue ? OPEN_CHAT : CLOSE_CHAT;
    ObserverChatBotManager.notify({
      context: ContextChatBotManager,
      value: {
        type
      }
    });
  };

  return (
    <Box>
      <Drawer
        sx={{
          flexShrink: 0,
          width: DRAWER_WIDTH,
          "& .MuiDrawer-paper": {
            display: "grid",
            gridTemplateRows: "50px 1fr",
            flexDirection: "column",
            height: "auto",
            width: DRAWER_WIDTH
          }
        }}
        variant="persistent"
        anchor="right"
        open={isOpen}
      >
        <Box
          className="header"
          sx={{
            borderBottom: "1px solid whitesmoke",
            display: "flex",
            alignSelf: "center"
          }}
        >
          <IconButton onClick={handleDrawerDisplayToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <ChatBox />
      </Drawer>
      <FabButton onClick={handleDrawerDisplayToggle} />
    </Box>
  );
}

export default Chat;
