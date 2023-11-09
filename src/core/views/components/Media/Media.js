import React, { useEffect, useState } from "react";
import Arrows from "@components/Arrows/Arrows";
import Sizes from "@components/Sizes/Sizes";
import Indicator from "@components/Indicator/Indicator";
import { Image as ImagePanel, DiscountTag, DiscountValue } from "./Styles";
import { ProductDetailsContext } from "@contexts/Zoom";
import { ProductDetailsObserver } from "@observers/Zoom";
import { OPEN_PRODUCT_DETAILS, SET_SIZES } from "@core/constants";
import { useMediaImageIndex } from "@core/hooks/useMediaImageIndex";
import { useImageLoader } from "@core/hooks/useImageLoader";
import { Box, CircularProgress } from "@mui/material";
import theme from "@core/theme";

const ImageLoader = ({
  children,
  src,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const isReady = useImageLoader(src);
  return (
    <ImagePanel
      src={isReady ? src : ""}
      onMouseLeave={isReady ? onMouseLeave : null}
      onMouseEnter={isReady ? onMouseEnter : null}
      onClick={isReady ? onClick : null}
    >
      {children}
      {!isReady && (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            placeContent: "center",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <CircularProgress
            sx={{
              "& svg": {
                color: theme.colors.primary,
              },
            }}
          />
        </Box>
      )}
    </ImagePanel>
  );
};

export default function Media({ data = [], sizes = [], discount = 0 }) {
  const [isActive, setActive] = useState(false);
  const dataLength = data[SET_SIZES.MEDIUM].length;
  const { imageIndex, setImageIndex } = useMediaImageIndex({
    dataLength,
    isActive,
  });

  const handleSelectIndex = (index) => setImageIndex(index);

  const handleMouseEnter = () => setActive(true);

  const handleMouseLeave = () => setActive(false);

  const handleBack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let nextImageIndex = imageIndex - 1;
    const hasReachedBegin = nextImageIndex < 0;
    if (hasReachedBegin) nextImageIndex = 0;
    setImageIndex(nextImageIndex);
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let nextImageIndex = imageIndex + 1;
    const hasReachedEnd = nextImageIndex === dataLength;
    if (hasReachedEnd) nextImageIndex = 0;
    setImageIndex(nextImageIndex);
  };

  const handleProductDetails = () => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const size = vw <= SET_SIZES.MEDIUM ? SET_SIZES.MEDIUM : SET_SIZES.LARGE;
    ProductDetailsObserver.notify({
      value: {
        type: OPEN_PRODUCT_DETAILS,
        payload: {
          sizes,
          thumbnails: data[SET_SIZES.SMALL],
          data: data[size],
          discount,
        },
      },
      context: ProductDetailsContext,
    });
  };

  return (
    <ImageLoader
      onClick={handleProductDetails}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      src={data["500"][imageIndex]}
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
    </ImageLoader>
  );
}
