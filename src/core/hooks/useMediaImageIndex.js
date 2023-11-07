import { useEffect, useState } from "react";
import { ANIMATION_TIME } from "@constants";

export function useMediaImageIndex({ dataLength, isActive }) {
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    let timeoutId;
    function setAnimation() {
      timeoutId = setInterval(() => {
        let nextImageIndex = imageIndex + 1;
        const hasReachedEnd = nextImageIndex === dataLength;
        if (hasReachedEnd) nextImageIndex = 0;
        setImageIndex(nextImageIndex);
      }, ANIMATION_TIME);
    }
    if (!isActive) {
      clearInterval(timeoutId);
    } else {
      setAnimation();
    }
    return () => {
      clearInterval(timeoutId);
    };
  }, [imageIndex, dataLength, isActive]);

  return { imageIndex, setImageIndex };
}
