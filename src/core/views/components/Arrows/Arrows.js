import React from "react";
import { ArrowWrapper, Container } from "./Styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Arrows({
  isVisible = false,
  onBack = () => null,
  onNext = () => null,
}) {
  return (
    <Container isVisible={isVisible} className="arrows">
      <ArrowWrapper onClick={onBack} className="arrows__left">
        <ArrowBackIcon />
      </ArrowWrapper>
      <ArrowWrapper onClick={onNext} className="arrows__right">
        <ArrowForwardIcon />
      </ArrowWrapper>
    </Container>
  );
}
