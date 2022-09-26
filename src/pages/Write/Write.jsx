import React, { useState } from "react";
import PageHeader from "../../components/Header/Header";
import AddPost from "../../components/AddPost/AddPost";

import { Grid } from "semantic-ui-react";
import * as postsAPI from "../../utils/postApi";

export default function More({ loggedUser, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  async function handleAddPost(post) {


    //-------------------------------------------------------------------------
    //This is correct (i think). The post has the two new items
    console.log(post, "HERE IS THE POST - HANDLE ADD POST");
    post.forEach((item) => {
      console.log(item, "<--item");
    });

    try {
      const response = await postsAPI.create(post); 



      // At this point the response is coming back with the post without
      // the Title and the Poem
      console.log(response, "HERE IS THE RESPONSE");
      //--------------------------------------------------------------------




      // data is the response from the api, the result of the .then if(res.ok) return res.json() in the create postAPI utils function
      setPosts([response.data, ...posts]); /// ...posts would keep all the posts in the previous states array
        console.log(posts, "<----POSTS")
    } catch (err) {
      // this is the error from the throw block, in the postsAPI.create function
      console.log(err.message, "<---ERROR IN WRITE.JSX");
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
