import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import colors from "common/styles/colors";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = styled.input`
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid ${colors.gray[300]};
  border-radius: 0;
  width: 100%;
  outline: none !important;
  transition: border-bottom-color 0.3s ease;
  &:focus {
    border-bottom-color: ${colors.gray[500]};
  }
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-weight: 600;
`;

const StyledInput = (props: InputProps) => (
  <div style={{ textAlign: "left" }}>
    <Label>{props.label}</Label>
    <Input {...props} />
  </div>
);

export default StyledInput;
