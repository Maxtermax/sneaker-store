import { useObserver } from 'hermes-io';
import { ProductDetailsObserver } from "@observers/Zoom";
import { ProductDetailsContext } from "@contexts/Zoom";
import { useState } from 'react';
import { OPEN_PRODUCT_DETAILS, CLOSE_PRODUCT_DETAILS } from '@core/constants';

export const useProductDetails = () => {
  const [openDialog, setDialog] = useState(false);
  const [image, setImage] = useState(null); 
  const handleZoomNotification = (event) => {
    const { value = {} } = event;
    const { type, payload } = value;
    if (type === OPEN_PRODUCT_DETAILS) {
      setDialog(true);
      setImage(payload);
    }
    if (type === CLOSE_PRODUCT_DETAILS) {
      setDialog(false);
      setImage(null);
    }
  };
  useObserver({
    contexts: [ProductDetailsContext],
    observer: ProductDetailsObserver,
    listener: handleZoomNotification,
  });
  return { openDialog, setDialog, image };
}
