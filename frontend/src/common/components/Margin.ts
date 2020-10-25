import styled from "styled-components";

const Margin = styled.div<{
  $left?: string
  $right?: string
  $bottom?: string
  $top?: string
  $x?: string
  $y?: string
  $all?: string
}>`
  margin: ${(props) => props.$all};
  margin-left: ${(props) => props.$left ? props.$left : (props.$x && props.$x)};
  margin-right: ${(props) => props.$right ? props.$right : (props.$x && props.$x)};
  margin-bottom: ${(props) => props.$bottom ? props.$bottom : (props.$y && props.$y)};
  margin-top: ${(props) => props.$top ? props.$top : (props.$y && props.$y)};
`;

export default Margin;
