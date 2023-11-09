import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Dialog,
  IconButton,
  Skeleton,
} from "@mui/material";
import { Zoom } from "@core/views/components/Zoom/Zoom";
import CloseIcon from "@mui/icons-material/Close";
import {
  Content,
  Close,
  MediaContainer,
  Thumbnail,
  ThumbnailContainer,
  ThumbnailButton,
} from "./Styles";
import Arrows from "@core/views/components/Arrows/Arrows";
import { useMediaImageIndex } from "@core/hooks/useMediaImageIndex";
import { useImageLoader } from "@core/hooks/useImageLoader";
import theme from "@core/theme";

function useSizes() {
  const [sizes, setSizes] = useState({});
  useEffect(() => {
    const mediaNode = document.getElementById("media");
    if (mediaNode) {
      const mediaRect = mediaNode.getBoundingClientRect();
      setSizes({
        width: mediaRect.width,
        height: mediaRect.height,
      });
    }
  }, []);
  return { sizes };
}

const ThumbnailLoader = (props) => {
  const isReady = useImageLoader(props.src);
  return (
    <>
      {!isReady ? (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            placeContent: "center",
            width: "100px",
            height: "100px",
            border: `2px solid ${theme.colors.primary}`,
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
      ) : (
        <Thumbnail {...props} />
      )}
    </>
  );
};

const Media = (props) => {
  const { image = {} } = props;
  const dataLength = image.data.length;
  const { sizes } = useSizes();
  const hasSizes = sizes.width && sizes.height;
  const isNotMobile = window.innerWidth > 500;
  const { imageIndex, setImageIndex } = useMediaImageIndex({
    dataLength,
    isActive: false,
  });

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

  const handleSelectThumbnail = (index) => () => setImageIndex(index);

  return (
    <MediaContainer id="media">
      {hasSizes ? (
        <Zoom
          width={sizes.width}
          height={sizes.height}
          key={image.data[imageIndex]}
          src={image.data[imageIndex]}
        />
      ) : null}
      <ThumbnailContainer>
        {image.thumbnails.map((url, index) => (
          <ThumbnailButton key={url} onClick={handleSelectThumbnail(index)}>
            <ThumbnailLoader active={imageIndex === index} src={url} />
          </ThumbnailButton>
        ))}
      </ThumbnailContainer>
      {isNotMobile ? (
        <Arrows isVisible onBack={handleBack} onNext={handleNext} />
      ) : null}
    </MediaContainer>
  );
};

export const Details = (props) => {
  return (
    <Dialog open={props.open} fullWidth fullScreen>
      <Content>
        <Close>
          <IconButton onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Close>
        {props.open ? <Media image={props.data} /> : null}
      </Content>
    </Dialog>
  );
};
