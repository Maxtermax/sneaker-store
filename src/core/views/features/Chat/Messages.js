import React, { useLayoutEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Box } from "@mui/material";
import { MESSAGE_DIRECTIONS } from "@core/constants";

export default function Messages({ data = [] }) {
  useLayoutEffect(() => {
    const [lastItem] = data.slice(-1);
    if (lastItem) {
      const element = document.getElementById(lastItem.id);
      element.scrollIntoView();
    }
  }, [data]);

  return (
    <List
      sx={{
        bgcolor: "background.paper",
        paddingRight: "5px",
        width: "100%",
        overflowY: "auto",
        height: "calc(100% - 500px)",
        minHeight: "calc(100vh - 150px)",
        maxHeight: "100vh",
        "&::-webkit-scrollbar": {
          width: "12px",
        },
        "&::-webkit-scrollbar-track": {
          borderLeft: "1px solid silver",
          width: "20px",
        },
        "&::-webkit-scrollbar-thumb": {
          border: "3px solid transparent",
          borderRadius: "100px",
          backgroundColor: "grey",
          backgroundClip: "content-box",
        },
      }}
    >
      {data.map(({ direction, content, time, id }) => {
        const isOutBoundMessage = direction === MESSAGE_DIRECTIONS.OUT;
        return (
          <ListItem
            key={id}
            id={id}
            alignItems="flex-start"
            sx={{
              flexDirection: isOutBoundMessage ? "row-reverse" : "row",
            }}
          >
            <Box
              sx={{
                position: "relative",
                left: isOutBoundMessage ? "8px" : "-8px",
                top: isOutBoundMessage ? "8px" : "8px",
              }}
            >
              {isOutBoundMessage ? <EmojiEmotionsIcon /> : <SmartToyIcon />}
            </Box>
            <ListItemText
              sx={{
                background: "whitesmoke",
                padding: "12px",
                textAlign: isOutBoundMessage ? "right" : "left",
                borderRadius: isOutBoundMessage
                  ? "10px 0px 10px 10px"
                  : "0px 10px 10px 10px",
              }}
              primary={isOutBoundMessage ? "You said:" : "BOB said:"}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {content}
                  </Typography>

                  <Typography
                    sx={{
                      top: "5px",
                      position: "relative",
                    }}
                    variant="caption"
                    display="block"
                    gutterBottom
                  >
                    {time}
                  </Typography>
                </>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}
