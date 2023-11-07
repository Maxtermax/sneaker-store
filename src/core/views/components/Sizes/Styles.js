import styled from "styled-components";

export const Container = styled.ol`
  align-items: center;
  border-radius: 10px;
  bottom: 0px;
  display: flex;
  position: absolute;
  justify-content: space-evenly;
  gap: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
  width: 50%;
  height: 45px;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  transition: all 0.35s ease-in;
`;

export const Size = styled.li`
  background: ${({ theme = {}, isSelected = false }) =>
    isSelected ? theme.colors.contrast.secondary : "transparent"};
  color: ${({ theme = {}, isSelected = false }) =>
    isSelected
      ? theme.colors.contrast.primary
      : theme.colors.contrast.secondary};
  cursor: pointer;
  display: flex;
  place-content: center;
  font-size: ${({ theme = {} }) => theme.typography.sizes.small};
  font-family: ${({ theme = {} }) => theme.typography.primary.fontFamily};
  border-radius: 100px;
  padding: 10px;
  width: 10px;
  height: 10px;
  transition: all 0.25s ease-in 0s;
  align-items: center;
  transition: all 0.25s ease-in;
  &:hover {
    background: ${({ theme = {} }) => theme.colors.contrast.secondary};
    color: ${({ theme = {} }) => theme.colors.contrast.primary};
  }
`;
