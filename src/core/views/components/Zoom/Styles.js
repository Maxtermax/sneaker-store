import styled from 'styled-components';

export const Canvas = styled.canvas`
  cursor: zoom-in;
  @media (max-width: 420px) {
    position: absolute;
    top: calc(50% - 200px);
  }
`;
