import React, { ReactNode } from "react";
import styled from "styled-components";
import Card from "./Card";
import Flex from "./Flex";
import Overlay from "./Overlay";
import Padded from "./Padded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
  title?: string;
  onClose: () => void;
  children?: ReactNode;
};

const MouseHover = styled.div`
  cursor: pointer;
`;

const Modal = ({ title, onClose, children }: ModalProps) => {
  return (
    <Overlay>
      <Card isModal>
        <Padded $all="16px">
          <Flex $justify="space-between" $space="16px">
            <h2 style={{ margin: 0 }}>{title}</h2>
            <MouseHover>
              <Padded $all="4px" onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} style={{ fontSize: 20 }} />
              </Padded>
            </MouseHover>
          </Flex>
        </Padded>
        {children}
      </Card>
    </Overlay>
  );
};

export default Modal;
