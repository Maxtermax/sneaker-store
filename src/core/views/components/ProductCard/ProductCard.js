import React from "react";
import {
  Card,
  Content,
  Button,
  Title,
  Description,
  Price,
  PriceWrapper,
} from "./Styles";
import { formatNumberToCurrency } from "@utils/formatter";
import Media from "@components/Media/Media";

export default function ProductCard(props = {}) {
  const { data = {} } = props;
  return (
    <Card>
      <Media discount={data.discount} sizes={data.sizes} data={data.images} />
      <Content active={props.active}>
        <Title title={data.name}>{data.name}</Title>
        <Description title={data.description}>{data.description}</Description>
        <PriceWrapper>
          {data.discount > 0 ? (
            <>
              <Price title={"price before:" + data.price} incorrect>
                ${formatNumberToCurrency(data.price)}
              </Price>
              <span>/</span>
            </>
          ) : null}
          <Price title={data.value}>
            ${formatNumberToCurrency(data.value)}
          </Price>
        </PriceWrapper>
        <Button
          title={data.selected ? "Remove from car" : "Add to car"}
          onClick={() =>
            data.selected ? props.onRemove(data) : props.onAdd(data)
          }
        >
          {data.selected ? "Remove from" : "Add to"} car
        </Button>
      </Content>
    </Card>
  );
}
