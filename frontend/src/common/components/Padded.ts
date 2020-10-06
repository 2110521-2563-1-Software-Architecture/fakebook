import styled from "styled-components";

const Padded = styled.div<{
  $size: string;
}>`
  padding: ${(props) => props.$size};
`;

export default Padded;
