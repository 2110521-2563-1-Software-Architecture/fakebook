import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import colors from "common/styles/colors";
import empty from "common/assets/empty_avatar.png";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  $src?: any;
  $rounded?: boolean;
  $size?: string;
}

const StyledAvatar = styled.div<AvatarProps>`
  background-color: ${colors.gray[300]};
  background-position: 50% 50%;
  border-radius: ${(props) => (props.$rounded ? "50%" : "")};
  width: ${(props) => props.$size || "32px"};
  height: ${(props) => props.$size || "32px"};
  overflow: hidden;
  img {
    object-fit: cover;
    width: ${(props) => props.$size || "32px"};
    height: ${(props) => props.$size || "32px"};
  }
`;

const Avatar = (props: AvatarProps) => {
  return (
    <StyledAvatar $rounded={props.$rounded} $size={props.$size} {...props}>
      <img src={props.$src || empty} />
    </StyledAvatar>
  );
};

export default Avatar;
