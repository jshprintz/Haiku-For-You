import React from "react";
import PageHeader from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import DisplayPost from "../../components/DisplayPost/DisplayPost";

import { Grid } from "semantic-ui-react";

export default function Write({ loggedUser, handleLogout }) {
  // const [posts, setPosts] = useState([]);

  const { post } = useParams();
  console.log(post, "HERE IS THE POST");

  // USE THE ID TO FIND THE POSTS IN THE POSTS API

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <h1>Haiku Details</h1>
          <DisplayPost post={post} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}></Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
