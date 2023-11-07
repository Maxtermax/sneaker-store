import React, { useState, useRef } from "react";
import { Container, Content, Header, Total } from "./Styles";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import theme from "@theme";
import { Slide } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const calculateTotal = (data = []) =>
  data.reduce((acc, { price = 0 }) => acc + Number(price), 0);

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    background: theme.colors.fifth,
    color: "white",
    right: -3,
    top: 13,
    padding: "0 4px",
  },
}));

const ShoppingCar = (props = {}) => {
  const [showProducts, setShowProducts] = useState(false);
  const anchorRef = useRef(null);
  const { data = [] } = props;
  const total = calculateTotal(data);

  const handleDisplayCar = () => setShowProducts(!showProducts);

  return (
    <>
      <Header>
        <IconButton
          ref={anchorRef}
          className="car"
          aria-label="car"
          onClick={handleDisplayCar}
        >
          <StyledBadge badgeContent={data.length}>
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        <Slide
          container={anchorRef.current}
          direction="left"
          in={showProducts}
          mountOnEnter
          unmountOnExit
        >
          <Content>
            <Total>Total: ${total}</Total>
            <IconButton onClick={handleDisplayCar}>
              <CloseIcon/>
            </IconButton>
          </Content>
        </Slide>
      </Header>
    </>
  );
};

export default ShoppingCar;
