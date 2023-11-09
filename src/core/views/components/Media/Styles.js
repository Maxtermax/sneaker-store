import styled from "styled-components";

export const DiscountTag = styled.div`
  border: 45px solid ${({ theme = {} }) => theme.colors.fifth};
  border-bottom-color: transparent;
  border-right-color: transparent;
  position: absolute;
  top: -8px;
  left: -8px;
  width: 0px;
  height: 0px;
}
`;

export const DiscountValue = styled.span`
  color: ${({ theme = {} }) => theme.colors.contrast.primary};
  font-family: ${({ theme = {} }) => theme.typography.primary.fontFamily};
  font-size: ${({ theme = {} }) => theme.typography.sizes.large};
  position: absolute;
  margin-left: -35px;
  margin-top: -25px;
`;

export const Image = styled.div`
  border: 2px solid ${({ theme = {} }) => theme.colors.primary}};
  background-image: url(${(props) => props.src});
  background-color: white;
  background-size: 78%;
  background-repeat: no-repeat;
  background-position: center bottom;
  cursor: ${(props) => props.src ? 'zoom-in' : 'default'};
  display: flex;
  transition: all 0.3s;
  position: relative;
  height: 280px; 
  &:hover {
    border: 4px solid ${({ theme = {} }) => theme.colors.primary};
    background-size: 90%;
  }
  &:hover .product-sizes {
    visibility: visible;
  }
`;
