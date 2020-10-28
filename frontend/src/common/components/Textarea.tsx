import React, { TextareaHTMLAttributes } from "react";
import styled from "styled-components";
import colors from "common/styles/colors";

interface TextareaProps extends TextareaHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Textarea = styled.textarea`
  padding: 12px 8px;
  box-sizing: border-box;
  border: none;
  border: 1px solid ${colors.gray[300]};
  border-radius: 8px;
  min-height: 150px;
  width: 100%;
  outline: none !important;
  transition: border-bottom-color 0.3s ease;
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-weight: 600;
`;

const StyledInput = (props: TextareaProps) => (
  <div style={{ textAlign: "left" }}>
    <Label>{props.label}</Label>
    <Textarea {...props} />
  </div>
);

export default StyledInput;
