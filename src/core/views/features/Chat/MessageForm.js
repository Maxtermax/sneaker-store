import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function MessageForm({ onSubmit }) {
  const messageInputRef = useRef(null);
  const [isInvalidField, setIsInvalidField] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = messageInputRef.current.value;
    if (!value) return setIsInvalidField(true);
    setIsInvalidField(false);
    onSubmit?.(value);
    e.target.reset();
  }
  return (
    <Box
      sx={{
        alignItems: "center",
        borderTop: "1px solid whitesmoke",
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        height: "64px",
      }}
      onSubmit={handleSubmit}
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        sx={{
          paddingLeft: "5px",
          paddingRight: "5px",
          width: "100%",
        }}
        error={isInvalidField}
        required
        inputRef={messageInputRef}
        label="Required"
        placeholder="Type a message"
        variant="filled"
      />
      <IconButton type="submit">
        <SendIcon />
      </IconButton>
    </Box>
  );
}
