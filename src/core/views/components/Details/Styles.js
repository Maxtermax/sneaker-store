import styled from "styled-components";

export const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
  gap: 100px;
  @media (max-width: 580px) {
    width: 400px;
    gap: 10px;
    left: calc(50% - 200px);
  }
`;

export const ThumbnailButton = styled.button`
  border: none;
  background: transparent;
`;

export const Thumbnail = styled.img`
  border: 2px solid transparent;
  border-color: ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
  width: 100px; 
  height: 100px;
  transition: all 0.25s;
  cursor: pointer;
  &:hover {
    border: 4px solid ${({ theme = {} }) => theme.colors.primary}};
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
`;

export const MediaContainer = styled.div`
  align-items: center;
  align-content: center;
  display: grid;
  row-gap: 20px;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  max-height: 550px;
  & .arrows .arrows__left {
    margin-left: 20px;
  }
  & .arrows .arrows__right {
    margin-right: 20px;
  }
  & .arrows {
    position: absolute;
    top: calc(50% - 30px);
    width: calc(100% - 20px);
    & button {
      background: none;
    }
    & svg {
      font-size: 40px;
      width: 40px;
    }
  }
`;

export const Close = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  height: 50px;
  width: 50px;
  position: absolute;
  top: 10px;
  right: 20px;
`;
