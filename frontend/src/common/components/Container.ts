import styled from "styled-components";

const Container = styled.div<{ $maxWidth?: string }>`
  max-width: ${(props) => props.$maxWidth || "1100px"};
  width: 90%;
  margin: auto;
`;

export default Container;
