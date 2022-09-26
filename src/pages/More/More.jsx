import React from "react";
import PageHeader from "../../components/Header/Header";
import { Grid } from "semantic-ui-react";

export default function More({ loggedUser, handleLogout }) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <h1>Here is the MORE page.</h1>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
