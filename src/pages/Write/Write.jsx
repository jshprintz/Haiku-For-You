import React, { useState } from "react";
import PageHeader from "../../components/Header/Header";
import AddPost from "../../components/AddPost/AddPost";

import { Grid } from "semantic-ui-react";
import * as postsAPI from "../../utils/postApi";

export default function Write({ loggedUser, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  async function handleAddPost(post) {

    try {
      const response = await postsAPI.create(post); 
      setPosts([response.data, ...posts]); 
    } catch (err) {
      setError("Error creating post, please try again");
    }
  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <h1>Write a Haiku</h1>
          <p>{error}</p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPost handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
