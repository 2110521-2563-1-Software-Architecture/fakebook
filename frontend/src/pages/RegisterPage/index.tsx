import React, { useState, useCallback, ChangeEvent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { isNil, isEmpty } from "lodash";
import { useAuth } from "hooks/auth";
import { getAuthState } from "common/selectors";
import {
  Container,
  Card,
  Input,
  Padded,
  Gap,
  Button,
  SecondaryButton,
  Flex,
} from "common/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

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

const disableButton = (
  agree: boolean,
  username: string,
  password: string,
  email: string
) => {
  if (!agree || isEmpty(username) || isEmpty(password) || isEmpty(email))
    return true;
  return false;
};

const RegisterPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [agree, setAgree] = useState(false);

  const changeUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  const changeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const changePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const changeSubscribed = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSubscribed(e.target.checked);
  }, []);

  const changeAgree = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAgree(e.target.checked);
  }, []);

  const submit = useCallback(() => {
    Axios.post("/users", {
      username,
      email,
      password,
      subscribed,
    }).then(() => {
      login(username, password);
    });
  }, [username, email, password, subscribed]);

  const isLoggedIn = useSelector(getAuthState);
  if (isNil(isLoggedIn)) return null;
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <Container>
      <FullWidth $align="center" $justify="center">
        <Gap $size="32px" $fullwidth>
          <Flex $align="center" $justify="center">
            <Link to="/login" style={{ flex: 1 }}>
              <SecondaryButton>
                <FontAwesomeIcon icon={faArrowLeft} />
              </SecondaryButton>
            </Link>
            <h1 style={{ flex: "100%" }}>สร้างบัญชีผู้ใช้</h1>
            <div style={{ flex: 1 }} />
          </Flex>
          <Card>
            <Padded $size="16px">
              <Gap $size="48px">
                <Gap $size="16px">
                  <Input
                    label="ชื่อผู้ใช้"
                    type="text"
                    placeholder="ชื่อผู้ใช้"
                    value={username}
                    onChange={changeUsername}
                  />
                  <Input
                    label="อีเมล"
                    type="email"
                    placeholder="อีเมล"
                    value={email}
                    onChange={changeEmail}
                  />
                  <Input
                    label="รหัสผ่าน"
                    type="password"
                    placeholder="รหัสผ่าน"
                    value={password}
                    onChange={changePassword}
                  />
                  <Flex $align="center" $space="8px">
                    <input
                      type="checkbox"
                      onChange={changeAgree}
                      checked={agree}
                    />
                    <span style={{ textAlign: "left" }}>
                      ฉันยอมรับเงื่อนไขและข้อตกลงเกี่ยวกับการใช้งาน PartyHaan
                      รวมถึงนโยบายความเป็นส่วนตัว
                    </span>
                  </Flex>
                  <Flex $align="center" $space="8px">
                    <input
                      type="checkbox"
                      onChange={changeSubscribed}
                      checked={subscribed}
                    />
                    <span style={{ textAlign: "left" }}>
                      ฉันต้องการรับข่าวสารเกี่ยวกับโปรโมชั่นจาก PartyHaan
                    </span>
                  </Flex>
                </Gap>
                <Button
                  $size="large"
                  $fullwidth
                  onClick={submit}
                  disabled={disableButton(agree, username, password, email)}
                >
                  สร้างบัญชีผู้ใช้
                </Button>
              </Gap>
            </Padded>
          </Card>
        </Gap>
      </FullWidth>
    </Container>
  );
};

export default RegisterPage;
