import React, { useState, useCallback, ChangeEvent } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getAuthState } from "common/selectors";
import { useAuth } from "hooks/auth";
import { isNil, isEmpty } from "lodash";
import {
  Container,
  Card,
  Input,
  Padded,
  Gap,
  Button,
  Flex,
} from "common/components";

const FullWidth = styled(Flex)`
  width: 100%;
  max-width: 400px;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: initial;
  margin: auto;
  padding: 32px 4px;
  box-sizing: border-box;
  text-align: center;
`;

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
          <h1>เข้าสู่ระบบ</h1>
          <Card>
            <Padded $size="16px">
              <Gap $size="16px">
                <Input
                  label="ชื่อผู้ใช้"
                  type="text"
                  placeholder="ชื่อผู้ใช้"
                  value={username}
                  onChange={changeUsername}
                />
                <Input
                  label="รหัสผ่าน"
                  type="password"
                  placeholder="รหัสผ่าน"
                  value={password}
                  onChange={changePassword}
                />
                <Button
                  $fullwidth
                  onClick={loginClick}
                  disabled={disableButton(username, password)}
                >
                  เข้าสู่ระบบ
                </Button>
              </Gap>
            </Padded>
          </Card>
          <Link to="/register">
            <Button $size="large" $fullwidth>
              สร้างบัญชีผู้ใช้
            </Button>
          </Link>
        </Gap>
      </FullWidth>
    </Container>
  );
};

export default LoginPage;
