import React, { useState, useCallback, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { isNil, isEmpty } from "lodash";
import Axios from "axios";
import { emailRegex } from "common/constants";
import { useAuth } from "modules/auth/hooks";
import { getAuthState } from "modules/auth/selectors";
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
import { FullWidth } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type FormValues = {
  fullname: string;
  username: string;
  password: string;
  email: string;
};

// Validation
const disableButton = ({ fullname, username, password, email }: FormValues) => {
  if (
    isEmpty(fullname) ||
    isEmpty(username) ||
    isEmpty(password) ||
    !emailRegex.test(email)
  )
    return true;
  return false;
};

const RegisterPage = () => {
  const { login } = useAuth();
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeFullName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  }, []);

  const changeUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  const changeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const changePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const submit = useCallback(() => {
    Axios.post("/api/user/register", {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      fullname,
    }).then(() => {
      login(username, password);
    });
  }, [username, email, password, fullname]);

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
            <h1 style={{ flex: "100%" }}>Create an Account</h1>
            <div style={{ flex: 1 }} />
          </Flex>
          <Card>
            <Padded $size="16px">
              <Gap $size="48px">
                <Gap $size="16px">
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={changeFullName}
                  />
                  <Input
                    label="Username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={changeUsername}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={changeEmail}
                  />
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={changePassword}
                  />
                </Gap>
                <Button
                  $size="large"
                  $fullwidth
                  onClick={submit}
                  disabled={disableButton({
                    fullname,
                    username,
                    password,
                    email,
                  })}
                >
                  Create an Account
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
