import { useState } from "react";
import { useObserver } from "hermes-io";
import { ChatBotManager as ObserverChatBotManager } from "../observers/ChatBotManager";
import { ChatBotManager as ContextChatBotManager } from "../contexts/ChatBotManager";
import { CLOSE_CHAT, OPEN_CHAT } from "@core/constants";

export const useChatBotManager = (cb) => {
  const handleUseChatBotManagerNotification = (event) => {
    const { value } = event;
    const { type } = value;
    let newValue = false;
    if (type === OPEN_CHAT) newValue = true;
    if (type === CLOSE_CHAT) newValue = false;
    cb?.({ isOpen: newValue });
  };
  useObserver({
    contexts: [ContextChatBotManager],
    observer: ObserverChatBotManager,
    listener: handleUseChatBotManagerNotification,
  });
};
