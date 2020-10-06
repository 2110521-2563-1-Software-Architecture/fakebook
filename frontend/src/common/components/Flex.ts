import styled from "styled-components";

const Flex = styled.div<{ $align: string; $justify: string; $space: string }>`
  display: flex;
  width: 100%;
  align-items: ${(props) => props.$align};
  justify-content: ${(props) => props.$justify};
  & > :not(:last-child) {
    margin-right: ${(props) => props.$space};
  }
  & > * {
    margin-bottom: ${(props) => props.$space};
  }
  margin-bottom: -${(props) => props.$space};
`;

export default Flex;
