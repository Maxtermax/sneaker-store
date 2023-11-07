import styled from "styled-components";

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  list-style: none;
  padding: 0px;
  justify-content: center;
  max-width: ${(props) => props.theme.sizes.medium};
  margin: 0px auto;
  align-items: start;
`;
