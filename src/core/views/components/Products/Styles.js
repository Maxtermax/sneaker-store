import styled from "styled-components";

export const List = styled.ul`
  display: ${(props = {}) => props.variant === 'grid' ? 'grid' : 'flex'};
  ${(props = {}) => props.variant === 'grid' && 'grid-template-columns: repeat(2, 1fr)'};
  flex-direction: column;
  flex-wrap: nowrap;
  list-style: none;
  padding: 0;
  justify-content: center;
  width: ${(props = {}) => props.variant === 'grid' ? '95%' : '800px' };
  padding: ${(props = {}) => props.variant === 'grid' ? '30px' : '0px' };
  margin: 80px auto;
`;

export const Card = styled.li`
  align-items: center;
  margin: 1rem;
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  height: 250px;
`;

export const Content = styled.div`
  display: flex;
  background: ${({theme = {}, active }) => active ? theme.colors.contrast.secondary : theme.colors.secondary};
  flex-direction: column;
  line-height: 1.3;
  padding-top: 25px;
  padding-left: 25px;
  padding-bottom: 25px;
  transition: all 0.25s ease-in;
  & p, h2, h3 {
    color: ${({ theme = {}, active }) => active ? theme.colors.contrast.primary : theme.colors.primary};
  }
  &:hover {
    background: ${({theme = {}}) => theme.colors.contrast.secondary};
    padding-top: 30px;
    padding-bottom: 30px;
  }
  &:hover h2 {
    color: ${({theme = {}}) => theme.colors.contrast.primary};
  }
  &:hover h3 {
    color: ${({theme = {}}) => theme.colors.contrast.primary};
  }
  &:hover p {
    color: ${({theme = {}}) => theme.colors.contrast.primary};
  }
`;

export const Title = styled.h2`
  color: ${({ theme = {} }) => theme.colors.primary}};
  text-transform: capitalize;
  font-size: 2.5rem;
  font-family: ${({ theme = {} }) => theme.typography.primary.fontFamily};
  font-weight: bold;
  margin: 0;
`;

export const Image = styled.div`
  border: 2px solid ${({ theme = {} }) => theme.colors.primary}};
  background-image: url(${(props) => props.src});
  background-color: white;
  background-size: 78%;
  background-repeat: no-repeat;
  background-position: center bottom;
  height: 100%;
  transition: all 0.3s;
  &:hover {
    border: 4px solid ${({ theme = {} }) => theme.colors.primary};
    background-size: 90%;
  }
`;

export const Description = styled.p`
  font-family: ${({ theme = {} }) => theme.typography.secondary.fontFamily};
  color: ${({ theme = {} }) => theme.colors.third};
  font-size: 1rem;
  font-weight: 100;
  text-transform: capitalize;
  font-style: italic;
`;

export const Price = styled.h3`
  color: ${({ theme = {} }) => theme.colors.third};
  font-family: ${({ theme = {} }) => theme.typography.primary.fontFamily};
  font-size: 15px;
  font-weight: 100;
  margin-top: 10px;
`;

export const Button = styled.button`
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-self: flex-end;
  position: relative;
  top: 10px;
  right: 20px;
  font-family: ${({ theme = {} }) => theme.typography.primary.fontFamily};
  border: 2px solid ${({ theme = {} }) => theme.colors.fifth};
  background: ${({ theme = {} }) => theme.colors.fifth};
  color: ${({ theme = {} }) => theme.colors.contrast.primary};
  padding: 10px;
  transition: all 0.3s;
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
  &:hover {
    padding: 15px;
  }
`;
