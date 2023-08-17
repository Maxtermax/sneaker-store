import styled from "styled-components";
import theme from "@theme";

export const Anchor = styled.div`
  align-self: center;
  color: ${({ theme = {} }) => theme.colors.contrast.primary};
  cursor: pointer;
  display: inline;
  padding: 20px;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.4rem;
  font-family: ${({ theme = {} }) => theme.typography.primary.fontFamily};
  width: 50px;
  height: 20px;
  margin-right: 50px;
  transition: all 0.35s;
`;

export const Header = styled.header`
  background: ${({ theme = {} }) => theme.colors.primary};
  margin-bottom: 20px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  z-index: 2;
`;

export const Content = styled.div`
  background: ${({ theme = {} }) => theme.colors.primary};
  ul {
    margin: 0px;
  }
`;

export const Total = styled.div`
  border-top: 1px dashed ${({ theme = {} }) => theme.colors.contrast.primary};
  color: ${({ theme = {} }) => theme.colors.contrast.primary};
  font-family: ${({ theme = {} }) => theme.typography.primary.fontFamily};
  font-size: 2rem;
  padding: 20px;
  padding-left: 0px;
  width: 90%;
  height: 2px;
  margin: 20px auto;
`;

export const WrapperStyles = {
  background: theme.colors.primary,
  transform: "scale(0.7)",
  top: "-10px",
  overflowY: "auto",
  position: "fixed",
  padding: "30px",
  transition: "all 0.35s",
  width: "800px",
  zIndex: "2",
};
