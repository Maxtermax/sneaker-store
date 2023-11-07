import React, { useCallback, useEffect, useRef } from "react";
import { Canvas } from "./Styles";
import { MAGNIFYING_SIZE, ZOOM_FACTOR } from "@core/constants";

export const Zoom = (props) => {
  const image = useRef(new Image());

  const drawBackground = useCallback(() => {
    const canvas = document.getElementById("zoom");
    const ctx = canvas.getContext("2d");
    const factor = Math.min(
      canvas.width / image.current.width,
      canvas.height / image.current.height
    );
    const scale = 1 / factor;
    ctx.scale(factor, factor);
    ctx.drawImage(image.current, 0, 0);
    ctx.scale(scale, scale);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("zoom");
    const ctx = canvas.getContext("2d");
    image.current.src = props.src;
    image.current.onload = function () {
      canvas.width =
        image.current.width < props.width
          ? image.current.width * 0.8
          : props.width;
      canvas.height =
        image.current.height < props.height
          ? image.current.height * 0.8
          : props.height;
      ctx.beginPath();
      drawBackground();
      ctx.closePath();
    };
  }, []);

  const handleMouseMove = (e) => {
    const canvas = e.target;
    const ctx = canvas.getContext("2d");
    // eslint-disable-next-line no-self-assign
    canvas.width = canvas.width;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    drawBackground();
    const region = new Path2D();
    region.rect(x, y, MAGNIFYING_SIZE, MAGNIFYING_SIZE);
    ctx.clip(region);
    ctx.strokeRect(x, y, MAGNIFYING_SIZE, MAGNIFYING_SIZE);
    ctx.scale(ZOOM_FACTOR, ZOOM_FACTOR);
    ctx.translate(0, 0);
    drawBackground();
    ctx.closePath();
  };
  return <Canvas id="zoom" onMouseMove={handleMouseMove} />;
};
