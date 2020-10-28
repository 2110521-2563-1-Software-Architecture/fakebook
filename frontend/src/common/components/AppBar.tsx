import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Container from "./Container";
import SecondaryButton from "./SecondaryButton";
import Button from "./Button";
import Flex from "./Flex";
import LinkComponent from "./Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "modules/auth/hooks";
import Padded from "./Padded";
import colors from "common/styles/colors";

const AppBarText = styled.h2`
  margin: auto;
  margin-top: 0;
  margin-bottom: 0;
  flex: 100%;
  text-align: center;
`;

const AppBar = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  width: 100%;
`;

const SmallButton = styled(Button)`
  min-width: initial !important;
`;

const SearchField = styled.input`
  min-width: 200px;
  background-color: ${colors.gray[300]};
  border-radius: 999px;
  padding: 8px 16px;
  box-shadow: none;
  border: none;
  outline: none !important;
  box-sizing: border-box;
`;

const StyledAppBar = () => {
  const { logout } = useAuth();
  const history = useHistory();
  const logoutClick = useCallback(() => {
    logout();
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    history.push(`/user/${e.target.search.value}`);
    window.location.reload();
  };

  return (
    <AppBar>
      <Container>
        <Flex $justify="space-between" $align="center" $space="16px">
          <Flex $space="16px" $align="center" $freeWidth>
            <LinkComponent to="/">
              <AppBarText>Fakebook</AppBarText>
            </LinkComponent>
            <form onSubmit={onFormSubmit} style={{ marginBottom: 0 }}>
              <SearchField name="search" />
            </form>
          </Flex>
          <Flex $space="8px" $freeWidth>
            <Link to="/user/edit">
              <SmallButton>
                <FontAwesomeIcon icon={faUserEdit} />
              </SmallButton>
            </Link>
            <SecondaryButton onClick={logoutClick}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </SecondaryButton>
          </Flex>
        </Flex>
      </Container>
    </AppBar>
  );
};

export default StyledAppBar;
