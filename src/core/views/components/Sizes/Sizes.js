import React, { useState } from "react";
import { Container, Size } from "./Styles";

export default function Sizes({ data = [] }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const handleSelectSize = (value) => {
    const isAlreadySelected = value === selectedSize;
    if (isAlreadySelected) {
      setSelectedSize(null);
      return;
    }
    setSelectedSize(value);
  };

  return (
    <Container isVisible={selectedSize !== null} title="sizes" className="product-sizes">
      {data.map((value) => (
        <Size
          isSelected={selectedSize === value}
          onClick={() => handleSelectSize(value)}
          title={value}
          key={value}
        >
          {value}
        </Size>
      ))}
    </Container>
  );
}
