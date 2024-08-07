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
  & svg {
    color: white;
  }
`;


export const MadeBy = styled.a`
  color: ${({ theme = {} }) => theme.colors.contrast.primary};
  font-family: ${({ theme = {} }) => theme.typography.secondary.fontFamily};
  font-size: 16px;
  text-decoration: none;
`

export const Header = styled.header`
  align-items: center;
  background: ${({ theme = {} }) => theme.colors.primary};
  margin-bottom: 20px;
  width: 100%;
  height: 80px;
  display: flex;
  padding-left: 20px;
  justify-content: space-between;
  z-index: 2;
  .car {
    margin-right: 40px;
  }
  & svg {
    color: white;
  }
`;

export const Content = styled.div`
  background: ${({ theme = {} }) => theme.colors.primary};
  width: 410px;
  height: 100%;
  position: fixed;
  padding: 20px;
  padding-bottom: 0px;
  top: 0px;
  z-index: 2;
  overflow-y: auto;
  & .arrows__left svg {
    color: black;
  }
  & .arrows__right svg {
    color: black;
  }
  & .close-icon {
    color: white;
    position: relative;
    left: calc(100% - 50px);
    top: 10px;
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
  margin-top: 20px;
  margin-bottom: 40px;
`;

export const Container = styled.div`
  width: 500px;
  z-index: 2;
  position: absolute;
  top: 70px;
  right: 0px;
`;
