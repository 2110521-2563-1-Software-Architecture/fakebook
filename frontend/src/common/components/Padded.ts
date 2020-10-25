import styled from "styled-components";

const Padded = styled.div<{
  $left?: string;
  $right?: string;
  $bottom?: string;
  $top?: string;
  $x?: string;
  $y?: string;
  $all?: string;
}>`
  padding: ${(props) => props.$all};
  padding-left: ${(props) =>
    props.$left ? props.$left : props.$x && props.$x};
  padding-right: ${(props) =>
    props.$right ? props.$right : props.$x && props.$x};
  padding-bottom: ${(props) =>
    props.$bottom ? props.$bottom : props.$y && props.$y};
  padding-top: ${(props) => (props.$top ? props.$top : props.$y && props.$y)};
`;

export default Padded;
