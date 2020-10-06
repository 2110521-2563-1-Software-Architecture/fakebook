import React, { MouseEventHandler } from "react";
import { Card, Separator, Padded, Gap, Button, Flex } from "common/components";
import PartyCardEmptyImage from "./PartyCardEmptyImage";

type Props = {
  count: number;
  total: number;
  name: string;
  onJoinClick: MouseEventHandler<HTMLButtonElement>;
};

const PartyCard = ({ count, total, name, onJoinClick }: Props) => {
  return (
    <Card>
      <PartyCardEmptyImage />
      <Padded $size="16px">
        <Gap $size="16px">
          <h4 style={{ marginTop: 0 }}>{name}</h4>
          <Separator />
          <p>
            จำนวนคน {count}/{total} คน
          </p>
          <Flex $justify="flex-end">
            <Button onClick={onJoinClick} disabled={count >= total}>
              {count >= total ? "Full" : "เข้าร่วมปาร์ตี้"}
            </Button>
          </Flex>
        </Gap>
      </Padded>
    </Card>
  );
};

export default PartyCard;
