import React from "react";
import { List } from "./Styles";
import ProductCard from "@components/ProductCard/ProductCard";

const ProductsList = (props = {}) => {
  const { data = [] } = props;
  return (
    <List>
      {data.map((product = {}) => (
        <ProductCard
          key={product.id}
          data={product}
          onAdd={props.onAdd}
          onRemove={props.onRemove}
        />
      ))}
    </List>
  );
};

export default ProductsList;
