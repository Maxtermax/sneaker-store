import { useEffect, useState } from 'react';

export const useImageLoader = (src = "") => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(false);
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setIsReady(true);
    };
  }, [src]);
  return isReady;
};
