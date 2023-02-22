import React from "react";
import {
  Image,
  List,
  Card,
  Content,
  Title,
  Description,
  Price,
  Button,
} from "./Styles";
import ProductsObserver from "@observers/products";
import * as contexts from "@contexts";

const Products = (props = {}) => {
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
    <List variant={props.variant}>
      {data.map((product = {}) => (
        <Card key={product.id}>
          <Image title={product.name} src={product.image} />
          <Content active={props.active}>
            <Title title={product.name}>{product.name}</Title>
            <Description title={product.description}>{product.description}</Description>
            <Price title={product.price}>${product.price}</Price>
            <Button
              title={product.selected ? "Remove from car" : "Add to car"}
              onClick={() =>
                product.selected
                  ? handleRemoveProduct(product)
                  : handleAddProduct(product)
              }
            >
              {product.selected ? "Remove from" : "Add to"} car
            </Button>
          </Content>
        </Card>
      ))}
    </List>
  );
};

export default Products;
