import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import theme from "@core/theme";

export function FabButton({ onClick }) {
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
            color: theme.colors.fifth,
          },
        }}
      >
        <MarkChatUnreadOutlinedIcon />
      </Fab>
    </Box>
  );
}
