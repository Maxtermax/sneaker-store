import React, { useState, useRef, useEffect } from "react";
import Products from "@components/Products/Products";
import { Anchor, Content, Header, Total, WrapperStyles } from "./Styles";

const calculateTotal = (data = []) =>
  data.reduce((acc, { price = 0 }) => acc + Number(price), 0);

const Wrapper = (props) => {
  const contentRef = useRef(null);
  useEffect(() => {
    const { anchor = {} } = props;
    const { left = 0 } = anchor;
    const padding = -10;
    const content = contentRef.current;
    const { width } = content.getBoundingClientRect();
    content.style.left = `${left - width - padding}px`;
  }, []);

  return (
    <div style={{ ...WrapperStyles }} ref={contentRef}>
      {props.children}
    </div>
  );
};

const ShoppingCar = (props = {}) => {
  const [showProducts, setShowProducts] = useState(false);
  const anchorRef = useRef(null);
  const { data = [] } = props;
  const total = calculateTotal(data);

  const handleDisplayCar = (e) => {
    anchorRef.current = e.target.getBoundingClientRect();
    setShowProducts(!showProducts);
  };

  return (
    <>
      <Header>
        <Anchor onClick={handleDisplayCar}>
          🛒 {data.length ? data.length : null}
        </Anchor>
      </Header>
      {showProducts && total > 0 ? (
        <Wrapper total={total} anchor={anchorRef.current}>
          <Content>
            <Products active={true} data={data} />
            <Total>Total: ${total}</Total>
          </Content>
        </Wrapper>
      ) : null}
    </>
  );
};

export default ShoppingCar;
