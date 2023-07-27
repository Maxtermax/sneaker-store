import styled from "styled-components";

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  flex-direction: column;
  flex-wrap: nowrap;
  list-style: none;
  padding: 0;
  justify-content: center;
  max-width: 1200px;
`;
