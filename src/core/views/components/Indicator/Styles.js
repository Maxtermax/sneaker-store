import styled from "styled-components";
import { keyframes } from "styled-components";
import { ANIMATION_TIME } from "@constants";

const fillAnimation = keyframes`
 0% { width: 0% }
 100% {  width: 100%}
`;

export const Container = styled.ol`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  position: absolute;
  top: 20px;
  width: 100%;
  height: 5px;
`;

export const Item = styled.li`
  background: silver;
  border-radius: 10px;
  display: flex;
  cursor: pointer;
  opacity: ${({ isSelected }) => (isSelected ? "1" : "0.5")};
  transition: all 0.25s ease-in;
  width: ${({ isSelected }) => (isSelected ? "8%" : "2%")};
  height: 100%;
  overflow: hidden;
  &:hover {
    opacity: 1;
    width: 8%;
  }
`;

export const Fill = styled.div`
  animation-name: ${fillAnimation};
  animation-duration: ${ANIMATION_TIME}ms;
  animation-iteration-count: infinite;
  background: ${({ theme = {} }) => theme.colors.contrast.secondary};
`;
