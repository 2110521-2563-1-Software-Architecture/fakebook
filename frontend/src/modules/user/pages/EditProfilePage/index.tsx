import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { isNil, isEmpty } from "lodash";
import { getCurrentUser } from "modules/auth/selectors";
import { User } from "common/types";
import { emailRegex } from "common/constants";
import { Card, Container, Input, Padded, Gap, Button } from "common/components";
import AppBar from "common/components/AppBar";

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
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  // Get Current User Details
  // const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const getCurrentUserApi = async () => {
      await Axios.get("/api/user/me").then((res) => {
        if (res.data) {
          const user = res.data;
          if (user.fullname) setFullName(user.fullname);
          if (user.email) setEmail(user.email);
        }
      });
    };
    getCurrentUserApi();
  }, []);

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
      <Container>
        <h1>Edit Profile</h1>
        <Card>
          <Padded $size="16px">
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
