import React from "react";
import ProductsList from "@components/ProductList/ProductList";
import { ProductsObserver } from "@core/observers/Products";
import { ADD_PRODUCTS, REMOVE_PRODUCTS } from "@core/constants";
import { ProductsContext } from "@core/contexts/Products";
import { Details } from '@core/views/components/Details/Details';
import { useProductDetails } from "@hooks/useProductDetails";

export default function Products(props = {}) {
  const { data = [] } = props;
  const { openDialog, setDialog, image } = useProductDetails();
  const handleAddProduct = (product) => {
    ProductsObserver.notify({
      value: { type: ADD_PRODUCTS, payload: product },
      context: ProductsContext,
    });
  };

  const handleRemoveProduct = (product) => {
    ProductsObserver.notify({
      value: {
        payload: product,
        type: REMOVE_PRODUCTS,
      },
      context: ProductsContext,
    });
  };

  const handleClose = () => setDialog(false);

  return (
    <>
      <ProductsList
        data={data}
        variant={props.variant}
        onAdd={handleAddProduct}
        onRemove={handleRemoveProduct}
      />
      <Details open={openDialog} data={image} onClose={handleClose} />
    </>
  );
}
