import styled from "styled-components";
import colors from "common/styles/colors";

const Avatar = styled.div<{
  $url?: string;
  $rounded?: boolean;
  $size?: string;
}>`
  background-color: ${colors.gray[300]};
  background-image: ${(props) => `url('${props.$url}')`};
  background-size: cover;
  background-position: 50% 50%;
  border-radius: ${(props) => (props.$rounded ? "50%" : "")};
  width: ${(props) => props.$size || "32px"};
  height: ${(props) => props.$size || "32px"};
`;

export default Avatar;
