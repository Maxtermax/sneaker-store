import React from "react";
import {
  Card,
  Content,
  Button,
  Title,
  Description,
  Price,
  PriceWrapper,
  List,
} from "./Styles";
import { formatNumberToCurrency } from "@utils/formatter";
import Media from "@components/Media/Media";
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
          <Media
            discount={product.discount}
            sizes={product.sizes}
            data={product.images}
          />
          <Content active={props.active}>
            <Title title={product.name}>{product.name}</Title>
            <Description title={product.description}>
              {product.description}
            </Description>
            <PriceWrapper>
              {product.discount > 0 ? (
                <>
                  <Price title={"price before:" + product.price} incorrect>
                    ${formatNumberToCurrency(product.price)}
                  </Price>
                  <span>/</span>
                </>
              ) : null}
              <Price title={product.value}>
                ${formatNumberToCurrency(product.value)}
              </Price>
            </PriceWrapper>
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
