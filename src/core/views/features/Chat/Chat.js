import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  CLOSE_CHAT,
  CLOSE_PRODUCT_DETAILS,
  DRAWER_WIDTH,
  OPEN_CHAT,
} from "@core/constants";
import { ChatBotManager as ObserverChatBotManager } from "@core/observers/ChatBotManager";
import { ChatBotManager as ContextChatBotManager } from "@core/contexts/ChatBotManager";
import { ProductDetailsObserver } from "@core/observers/Zoom";
import { ProductDetailsContext } from "@core/contexts/Zoom";
import { FabButton } from './FabButton';
import { ChatBox } from './ChatBox';

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const handleDrawerDisplayToggle = () => {
    const newValue = !isOpen;
    setIsOpen(newValue);
    const type = newValue ? OPEN_CHAT : CLOSE_CHAT;
    ObserverChatBotManager.notify({
      context: ContextChatBotManager,
      value: {
        type,
      },
    });
    if (type === CLOSE_CHAT) {
      ProductDetailsObserver.notify({
        context: ProductDetailsContext,
        value: {
          type: CLOSE_PRODUCT_DETAILS,
          payload: null,
        },
      });
    }
  };

  return (
    <Box
      sx={{
        zIndex: 2000000000,
        position: "fixed",
      }}
    >
      <Drawer
        sx={{
          flexShrink: 0,
          width: DRAWER_WIDTH,
          "& .MuiDrawer-paper": {
            display: "grid",
            gridTemplateRows: "50px 1fr",
            flexDirection: "column",
            height: "auto",
            width: DRAWER_WIDTH,
          },
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
            alignSelf: "center",
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
