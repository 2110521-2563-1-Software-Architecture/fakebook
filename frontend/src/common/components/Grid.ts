import styled, { css } from "styled-components";
import screen from "common/styles/screen";

interface Props {
  $size: string;
  $column?: number;
  $row?: number;
  $breakpoint?: "xs" | "sm" | "md" | "lg";
}

const applyResponsiveStyle = ({ $breakpoint }: Props) => {
  if (!$breakpoint) return "";
  return css`
    @media ${screen[$breakpoint]} {
      display: block;
      & > :not(:last-child) {
        margin-bottom: ${(props) => props.$size};
      }
    }
  `;
};

const applyGapStyle = ({ $size }: Props) => {
  return css`
    grid-gap: ${$size};
  `;
};

const applyColumnStyle = ({ $column }: Props) => {
  return (
    $column &&
    css`
      grid-template-columns: repeat(${$column}, 1fr);
    `
  );
};

const applyRowStyle = ({ $row }: Props) => {
  return (
    $row &&
    css`
      grid-template-rows: repeat(${$row}, 1fr);
    `
  );
};

const Grid = styled.div<Props>`
  width: 100%;
  display: grid;
  ${applyGapStyle};
  ${applyColumnStyle};
  ${applyRowStyle};
  ${applyResponsiveStyle};
`;

export default Grid;
