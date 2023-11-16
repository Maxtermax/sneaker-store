import React from "react";
import Box from "@mui/material/Box";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
import { MESSAGE_DIRECTIONS } from "@core/constants";
import { formatDate, s4 } from "@src/utils/formatter";
import { useChatBotManager } from "@core/hooks/useChatBotManager";

export function ChatBox() {
  const { executeSequence, isChatEnabled, messages, setMessages } = useChatBotManager();
  const handleSubmit = (text = "") => {
    let direction = MESSAGE_DIRECTIONS.OUT;
    setMessages((prevValue) => {
      const date = formatDate(new Date());
      const message = {
        id: s4(),
        direction,
        content: text,
        time: date,
      };
      return [...prevValue, message];
    });
    executeSequence(text);
  };
  return (
    <Box>
      <Messages data={messages} />
      <MessageForm isChatEnabled={isChatEnabled} onSubmit={handleSubmit} />
    </Box>
  );
}
