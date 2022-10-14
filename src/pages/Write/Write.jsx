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
    <Grid centered className="write-grid">
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="header-clearance">
        <Grid.Column textAlign="center">
          <p className="large-font-size sub-header centered">Write a Haiku</p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ width: 150 }}></Grid.Column>
        <Grid.Column style={{ width: 450 }}>
          <AddPost handleAddPost={handleAddPost} />
          <p>{error}</p>
        </Grid.Column>
        <Grid.Column style={{ width: 150 }}>
          <p className="card-text instructions">Remember!</p>
          <p className="instructions">Line One has 5 syllables...</p>
          <p className="instructions">Line Two has 7 syllables...</p>
          <p className="instructions">Line Three is back to 5 syllables!</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
