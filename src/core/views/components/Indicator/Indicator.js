import React from "react";
import { Container, Item, Fill } from "./Styles";

export default function Indicator({
  total = 0,
  isVisible = false,
  indicatorIndex = 0,
  onSelectIndex = () => null,
}) {
  const items = Array(total).fill(1);
  if (isVisible) {
    return (
      <Container>
        {items.map((_, index) => (
          <Item
            onClick={() => onSelectIndex(index)}
            isSelected={indicatorIndex === index}
            key={index}
          >
            {indicatorIndex === index ? <Fill /> : null}
          </Item>
        ))}
      </Container>
    );
  }
  return null;
}
