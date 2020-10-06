import styled from "styled-components";
import Button from "./Button";
import colors from "common/styles/colors";

const SecondaryButton = styled(Button)`
  background-color: ${colors.gray[300]} !important;
  color: ${colors.gray[700]};
  min-width: initial;
`;

export default SecondaryButton;
