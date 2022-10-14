import React from "react";
import PageHeader from "../../components/Header/Header";
import { Grid } from "semantic-ui-react";
import MoreMenu from "../../components/MoreMenu/MoreMenu";

export default function More({ loggedUser, handleLogout }) {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="centered large-font-size sub-header">FAQ</Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ width: 650 }}>
          <div className="faq">
            <MoreMenu />
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
