import React, { useState, useRef } from "react";
import { Content, Header, Total } from "./Styles";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import theme from "@theme";
import { Slide } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ProductsList from '@core/views/components/ProductList/ProductList';
import { ADD_PRODUCTS, REMOVE_PRODUCTS } from '@core/constants';
import { ProductsContext } from '@core/contexts/Products';
import { ProductsObserver } from '@core/observers/Products';

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
  const handleAdd = (product) => {
    ProductsObserver.notify({
      value: { type: ADD_PRODUCTS, payload: product },
      context: ProductsContext,
    });
  }
  const handleRemove = (product) => {
    ProductsObserver.notify({
      value: {
        payload: product,
        type: REMOVE_PRODUCTS,
      },
      context: ProductsContext,
    });

  }

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
            <IconButton className='close-icon' onClick={handleDisplayCar}>
              <CloseIcon/>
            </IconButton>
            <ProductsList data={data} onAdd={handleAdd} onRemove={handleRemove} />
            <Total>Total: ${total}</Total>
          </Content>
        </Slide>
      </Header>
    </>
  );
};

export default ShoppingCar;
