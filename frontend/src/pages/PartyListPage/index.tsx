import React, { useEffect } from "react";
import { Container, Grid, AppBar } from "common/components";
import PartyCard from "./components/PartyCard";
import { Party } from "common/types";
import useParty from "./hooks/useParty";

const PartyListPage = () => {
  const { parties, onJoinClick, getParties } = useParty();
  useEffect(() => {
    getParties();
  }, []);

  return (
    <React.Fragment>
      <AppBar />
      <Container style={{ marginTop: 32, paddingBottom: 48 }}>
        <Grid $size="8px" $column="2">
          {parties.map((e: Party, i: number) => (
            <PartyCard
              key={`party${i}`}
              name={e.name}
              count={e.users?.length}
              total={e.noPeople}
              onJoinClick={onJoinClick(e, i)}
            />
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default PartyListPage;
