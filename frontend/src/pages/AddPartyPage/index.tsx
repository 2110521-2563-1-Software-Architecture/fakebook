import React, { useState, useCallback, ChangeEvent } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showError } from "common/actions/error";
import { isEmpty } from "lodash";
import {
  Container,
  Input,
  Gap,
  Button,
  Flex,
  SecondaryButton,
} from "common/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

const FullWidth = styled(Flex)`
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: initial;
  margin: auto;
  padding: 32px 4px;
  box-sizing: border-box;
  text-align: center;
  background-color: white;
`;

const Narrow = styled(Container)`
  max-width: 400px;
`;

const disableButton = (name: string, noPeople: string) => {
  if (isEmpty(name) || isEmpty(noPeople)) return true;
  return false;
};

const AddParty = () => {
  const [name, setName] = useState("");
  const [noPeople, setNoPeople] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const changeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName]
  );
  const changeNoPeople = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNoPeople(e.target.value);
    },
    [setNoPeople]
  );

  const submit = useCallback(() => {
    if (!noPeople.match("^[0-9]+$")) {
      dispatch(
        showError({ errors: { message: "กรุณาระบุจำนวนคนให้ถูกต้อง" } })
      );
      return;
    }
    Axios.post("/parties", {
      name,
      noPeople: parseInt(noPeople),
    }).then(() => {
      history.push("/");
    });
  }, [name, noPeople]);

  return (
    <FullWidth align="center" justify="center">
      <Narrow>
        <Gap $size="64px" $fullwidth>
          <Gap $size="32px" $fullwidth>
            <Flex $align="center" $justify="center">
              <Link to="/" style={{ flex: 1 }}>
                <SecondaryButton>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </SecondaryButton>
              </Link>
              <h1 style={{ flex: "100%" }}>สร้างปาร์ตี้</h1>
              <div style={{ flex: 1 }} />
            </Flex>
            <Gap $size="16px">
              <Input
                label="ชื่อปาร์ตี้"
                type="text"
                value={name}
                placeholder="ชื่อปาร์ตี้"
                onChange={changeName}
              />
              <Input
                label="จำนวนคนที่ขาด"
                type="number"
                value={noPeople}
                placeholder="จำนวนคนที่ขาด"
                onChange={changeNoPeople}
                min={1}
                max={100}
              />
            </Gap>
          </Gap>
          <Button
            $fullwidth
            $size="large"
            onClick={submit}
            disabled={disableButton(name, noPeople)}
          >
            สร้างปาร์ตี้
          </Button>
        </Gap>
      </Narrow>
    </FullWidth>
  );
};

export default AddParty;
