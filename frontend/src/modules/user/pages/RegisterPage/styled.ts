import styled from "styled-components";
import Flex from "common/components/Flex";

export const FullWidth = styled(Flex)`
  width: 100%;
  max-width: 400px;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: initial;
  margin: auto;
  padding: 32px 4px;
  box-sizing: border-box;
  text-align: center;
`;
