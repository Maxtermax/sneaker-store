import React, { useEffect, useState } from "react";
import Arrows from "@components/Arrows/Arrows";
import Sizes from "@components/Sizes/Sizes";
import Indicator from "@components/Indicator/Indicator";
import { Image, DiscountTag, DiscountValue } from "./Styles";
import { ANIMATION_TIME } from "@constants";

function useMediaImageIndex({ dataLength, isActive }) {
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

  return { imageIndex, setImageIndex }
}

export default function Media({ data = [], sizes = [], discount = 0 }) {
  const [isActive, setActive] = useState(false);
  const dataLength = data.length;
  const { imageIndex, setImageIndex } = useMediaImageIndex({ dataLength, isActive });

  const handleSelectIndex = (index) => setImageIndex(index);

  const handleMouseEnter = () => setActive(true);

  const handleMouseLeave = () => setActive(false);

  const handleBack = () => {
    let nextImageIndex = imageIndex - 1;
    const hasReachedBegin = nextImageIndex < 0;
    if (hasReachedBegin) nextImageIndex = 0;
    setImageIndex(nextImageIndex);
  };

  const handleNext = () => {
    let nextImageIndex = imageIndex + 1;
    const hasReachedEnd = nextImageIndex === dataLength;
    if (hasReachedEnd) nextImageIndex = 0;
    setImageIndex(nextImageIndex);
  };

  return (
    <Image
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      src={data[imageIndex]}
    >
      {discount > 0 ? (
        <DiscountTag>
          <DiscountValue>{discount}%</DiscountValue>
        </DiscountTag>
      ) : null}
      {dataLength > 1 ? (
        <Indicator
          onSelectIndex={handleSelectIndex}
          indicatorIndex={imageIndex}
          isVisible={isActive}
          total={dataLength}
        />
      ) : null}
      <Sizes data={sizes} />
      {dataLength > 1 ? (
        <Arrows isVisible={isActive} onBack={handleBack} onNext={handleNext} />
      ) : null}
    </Image>
  );
}
