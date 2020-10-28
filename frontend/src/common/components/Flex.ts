import styled from "styled-components";

const Flex = styled.div<{
  $align: string;
  $justify: string;
  $space: string;
  $freeWidth: boolean;
}>`
  display: flex;
  width: ${(props) => (props.$freeWidth ? "auto" : "100%")};
  align-items: ${(props) => props.$align};
  justify-content: ${(props) => props.$justify};
  & > :not(:last-child) {
    margin-right: ${(props) => props.$space};
  }
  margin-bottom: 0;
`;

export default Flex;
