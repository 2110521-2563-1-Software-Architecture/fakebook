import styled, { css } from "styled-components";
import colors from "common/styles/colors";

const applyButtonSize = (size?: "small" | "default" | "large") => css`
    ${!size || size === "default" ? "padding: 8px 12px; font-size: 14px;" : ""}
    ${
      size === "small"
        ? "padding: 8px 6px; font-size: 12px; min-width: 80px"
        : ""
    }
    ${size === "large" ? "padding: 12px 16px; font-size: 16px;" : ""}
`;

const Button = styled.button<{
  $size?: "small" | "default" | "large";
  $fullwidth?: boolean;
}>`
  background-color: ${colors.primary[500]};
  border: none !important;
  border-radius: 8px;
  color: white;
  min-width: 120px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  cursor: pointer;
  outline: none !important;
  ${(props) => applyButtonSize(props.$size)};
  ${(props) =>
    props.$fullwidth &&
    css`
      width: 100%;
    `}
  &:hover {
    background-color: ${colors.primary[700]};
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export default Button;
