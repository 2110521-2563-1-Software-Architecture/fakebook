import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Container from "./Container";
import SecondaryButton from "./SecondaryButton";
import Button from "./Button";
import Flex from "./Flex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "modules/auth/hooks";

const AppBarText = styled.h2`
  margin: auto;
  margin-top: 0;
  margin-bottom: 0;
  flex: 100%;
  text-align: center;
`;

const AppBarItemRight = styled.div`
  flex: 1;
  text-align: right;
`;

const AppBar = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  width: 100%;
`;

const SmallButton = styled(Button)`
  min-width: initial !important;
`;

const StyledAppBar = () => {
  const { logout } = useAuth();
  const logoutClick = useCallback(() => {
    logout();
  }, []);
  return (
    <AppBar>
      <Container>
        <Flex $justify="space-between" $align="center" style={{ flex: 1 }}>
          <div style={{ flex: 1 }}>
            <Link to="/add-party">
              <SmallButton>
                <FontAwesomeIcon icon={faPlus} />
              </SmallButton>
            </Link>
          </div>
          <AppBarText>ปาร์ตี้ทั้งหมด</AppBarText>
          <AppBarItemRight>
            <SecondaryButton onClick={logoutClick}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </SecondaryButton>
          </AppBarItemRight>
        </Flex>
      </Container>
    </AppBar>
  );
};

export default StyledAppBar;
