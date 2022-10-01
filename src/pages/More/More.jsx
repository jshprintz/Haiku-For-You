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
      <Grid.Row className="header-clearance centered large-font-size" >
        FAQ
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ width: 150 }}>
        </Grid.Column>
        <Grid.Column style={{ width: 650 }} >
          <MoreMenu />
        </Grid.Column>
        <Grid.Column style={{ width: 150 }}>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
