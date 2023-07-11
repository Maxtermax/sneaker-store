import React from "react";
import { ArrowWrapper, Container } from "./Styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Arrows({ isVisible = false, onBack = () => null, onNext = () => null }) {
  return (
    <Container isVisible={isVisible}>
      <ArrowWrapper onClick={onBack}>
        <ArrowBackIosIcon />
      </ArrowWrapper>
      <ArrowWrapper onClick={onNext}>
        <ArrowForwardIosIcon />
      </ArrowWrapper>
    </Container>
  );
}
