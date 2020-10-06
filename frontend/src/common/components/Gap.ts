import styled, { css } from "styled-components";
import screen from "common/styles/screen";

const applyResponsiveStyle = ($breakpoint: "xs" | "sm" | "md" | "lg") => {
  return css`
    @media ${screen[$breakpoint]} {
      display: block;
    }
  `;
};

const Gap = styled.div<{
  $size: string;
  $type?: "vertical" | "horizontal";
  $breakpoint?: "xs" | "sm" | "md";
  $fullwidth?: boolean;
}>`
  & > :not(:last-child) {
    margin-bottom: ${(props) => props.$size};
  }
  ${(props) =>
    props.$fullwidth &&
    css`
      width: 100%;
    `}
  ${(props) => (props.$type === "horizontal" ? "display: flex;" : "")}
  ${(props) =>
    props.$breakpoint ? applyResponsiveStyle(props.$breakpoint) : ""}
`;

export default Gap;
