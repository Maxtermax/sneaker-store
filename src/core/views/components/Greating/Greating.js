import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";

const Greeting = ({ options }) => {
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
    </Box>
  );
};

export default Greeting;
