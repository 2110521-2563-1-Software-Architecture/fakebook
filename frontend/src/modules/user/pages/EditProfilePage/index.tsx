import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { setCurrentUser } from "modules/auth/actions";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { isEmpty } from "lodash";
import { getCurrentUser } from "modules/auth/selectors";
import { emailRegex } from "common/constants";
import {
  Card,
  Container,
  Input,
  Padded,
  Gap,
  Button,
  SecondaryButton,
  Flex,
} from "common/components";
import AppBar from "common/components/AppBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { narrow } from "common/styles/container";

type FormValues = {
  fullname: string;
  email: string;
};

// Validation
const disableButton = ({ fullname, email }: FormValues) => {
  if (isEmpty(fullname) || !emailRegex.test(email)) return true;
  return false;
};

const EditProfilePage = () => {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (currentUser?.fullname) setFullName(currentUser?.fullname);
    if (currentUser?.email) setEmail(currentUser?.email);
  }, [currentUser]);

  const editClick = useCallback(() => {
    Axios.put("/api/user/edit", {
      fullname,
      email,
    })
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            title: "Success",
            text: "Your profile has been edited",
          });
        }
        // Edit Current User in Redux Store
        dispatch(
          setCurrentUser({
            ...currentUser,
            fullname,
            email,
          })
        );
      })
      .catch((err) => console.log(err));
  }, [fullname, email]);

  const changeFullName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  }, []);

  const changeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  return (
    <>
      <AppBar />
      <Container $maxWidth={narrow}>
        <Flex $align="center" $justify="center">
          <Link to="/" style={{ flex: 1 }}>
            <SecondaryButton>
              <FontAwesomeIcon icon={faArrowLeft} />
            </SecondaryButton>
          </Link>
          <h1 style={{ flex: "100%", paddingLeft: "16px" }}>Edit Profile</h1>
          <div style={{ flex: 1 }} />
        </Flex>
        <Card>
          <Padded $all="16px">
            <Gap $size="16px">
              <Input
                label="Full Name"
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={changeFullName}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={changeEmail}
              />
              <Button
                onClick={editClick}
                disabled={disableButton({ fullname, email })}
              >
                Confirm
              </Button>
            </Gap>
          </Padded>
        </Card>
      </Container>
    </>
  );
};

export default EditProfilePage;
