import styled from "styled-components";
import colors from "common/styles/colors";

const Card = styled.div<{
  isModal?: boolean;
}>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px ${colors.gray[300]};
  overflow: hidden;
  ${(props) =>
    props.isModal
      ? `
    z-index: 2000;
    width: 600px;
    max-width: 100vw;
    overflow: auto;
    max-height: 80vh;
    box-shadow: 0px 4px 6px rgba(0,0,0,0.3);
  `
      : ""}
`;

export default Card;
