import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import colors from "common/styles/colors";

const Placeholder = styled.div`
  background-color: ${colors.gray[300]};
  color: ${colors.gray[500]};
  font-size: 30px;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 8px 0 0;
`;

const PartyCardEmptyImage = () => (
  <Placeholder>
    <FontAwesomeIcon icon={faImage} />
  </Placeholder>
);

export default PartyCardEmptyImage;
