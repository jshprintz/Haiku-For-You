import React from "react";
import PageHeader from "../../components/Header/Header";
import { Grid } from "semantic-ui-react";
import MoreMenu from "../../components/MoreMenu/MoreMenu"

export default function More({ loggedUser, handleLogout }) {
  return (
    <Grid  >
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="header-clearance" >
        <Grid.Column >
          <MoreMenu />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
