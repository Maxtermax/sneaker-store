import styled from "styled-components";

export const ArrowWrapper = styled.button`
  align-items: center;
  border: none;
  display: flex;
  cursor: pointer;
  justify-content: center;
  width: 30px;
  height: 60px;
  &:hover {
    background: ${({ theme = {} }) => theme.colors.transparenGrey};
  }
  & svg {
    width: 15px;
  }
`;

export const Container = styled.div`
  align-self: center;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  visibility: ${({ isVisible = false }) => (isVisible ? "visible" : "hidden")};
  justify-content: space-between;
  width: 100%;
`;
