import React, { useState, useCallback, ChangeEvent } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getAuthState } from "modules/auth/selectors";
import { useAuth } from "modules/auth/hooks";
import { isNil, isEmpty } from "lodash";
import { FullWidth } from "modules/user/styled";
import {
  Container,
  Card,
  Input,
  Padded,
  Gap,
  Button,
  Flex,
} from "common/components";

const disableButton = (username: string, password: string) => {
  if (isEmpty(username) || isEmpty(password)) return true;
  return false;
};

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  const changePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const loginClick = useCallback(() => {
    login(username, password);
  }, [username, password]);

  const isLoggedIn = useSelector(getAuthState);
  if (isNil(isLoggedIn)) return null;
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <FullWidth $align="center" $justify="center">
        <Gap $size="32px" $fullwidth>
          <h1>Login</h1>
          <Card>
            <Padded $size="16px">
              <Gap $size="16px">
                <Input
                  label="Username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={changeUsername}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={changePassword}
                />
                <Button
                  $fullwidth
                  onClick={loginClick}
                  disabled={disableButton(username, password)}
                >
                  Login
                </Button>
              </Gap>
            </Padded>
          </Card>
          <Link to="/register">
            <Button $size="large" $fullwidth>
              Create an Account
            </Button>
          </Link>
        </Gap>
      </FullWidth>
    </Container>
  );
};

export default LoginPage;
