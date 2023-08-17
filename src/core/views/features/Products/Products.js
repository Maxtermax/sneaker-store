import React from "react";
import ProductsObserver from "@observers/products";
import ProductsList from "@components/ProductList/ProductList";
import * as contexts from "@contexts";

export default function Products(props = {}) {
  const { data = [] } = props;
  const handleAddProduct = (product = {}) => {
    ProductsObserver.add.notify({ value: product, context: contexts.products });
  };

  const handleRemoveProduct = (product = {}) => {
    ProductsObserver.remove.notify({
      value: product,
      context: contexts.products,
    });
  };

  return (
    <ProductsList
      data={data}
      variant={props.variant}
      onAdd={handleAddProduct}
      onRemove={handleRemoveProduct}
    />
  );
}
