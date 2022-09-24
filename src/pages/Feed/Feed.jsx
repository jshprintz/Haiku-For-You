import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import PostGallery from "../../components/PostGallery/PostGallery"

import { Grid, GridColumn } from "semantic-ui-react";

import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likesApi";

export default function Feed({ loggedUser, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //<--CHANGE WHEN POSTs ADDED

  
  async function addLike(postId) {

    try {
      const response = await likesAPI.create(postId);
      console.log(response, "from add like");
      getPosts();
    } catch (err) {
      console.log(err, " err from server");
      setError("error adding like");
    }
  }
  
  async function removeLike(likeId) {
    try {
      const response = await likesAPI.removeLike(likeId);
      console.log(response, " remove like");
      getPosts();
    } catch (err) {
      console.log(err);
      setError("error removing like");
    }
  }

  async function getPosts() {
    try {
      const response = await postsAPI.getAll();
      console.log(response, " data");
      setPosts([...response.data]);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getPosts();
  }, []);

  
  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <ErrorMessage error={error} />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <Loading />
      </>
    );
  }

  return (
    <Grid centered>
      <Grid.Row>
        <GridColumn>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </GridColumn>
      </Grid.Row>
      <Grid.Row>
        <GridColumn style={{ maxwidth: 450 }}>
        <h1>Here are all the posts</h1>
        <PostGallery
            posts={posts}
            numPhotosCol={1}
            isProfile={false}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            loggedUser={loggedUser}
          />
        </GridColumn>
      </Grid.Row>
    </Grid>
  );
}
