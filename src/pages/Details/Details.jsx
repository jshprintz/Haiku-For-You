import React, { useState, useEffect, useCallback } from "react";
import PageHeader from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import DisplayPost from "../../components/DisplayPost/DisplayPost";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { Grid } from "semantic-ui-react";

import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likesApi";
import * as followersAPI from "../../utils/followersApi";

export default function Write({ loggedUser, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { post } = useParams();

  //--------------LIKES--------------------------
  async function addLike(postId) {
    try {
      const response = await likesAPI.create(postId);
      console.log(response, "from add like");
      getPost();
    } catch (err) {
      console.log(err, " err from server");
      setError("error adding like");
    }
  }

  async function removeLike(likeId) {
    try {
      const response = await likesAPI.removeLike(likeId);
      console.log(response, " remove like");
      getPost();
    } catch (err) {
      console.log(err);
      setError("error removing like");
    }
  }

  //------------------FOLLOWERS-----------------------
  async function addFollower(userId) {
    try {
      const response = await followersAPI.create(userId);
      console.log(response, "from add follower");
      getPost();
    } catch (err) {
      console.log(err, " err from server");
    }
  }

  async function removeFollower(followerId) {
    try {
      const response = await followersAPI.removeFollower(followerId);
      console.log(response, " remove follower");
      getPost();
    } catch (err) {
      console.log(err);
    }
  }

  //---------------------GET POST----------------------
  const getPost = useCallback(async () => {
    try {
      const response = await postsAPI.getPost(post);
      setPosts([response.data.posts]);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setLoading(false);
      setError("Post does not exist! Try again.");
    }
  }, [post]);

  useEffect(() => {
    getPost();
  }, [post, getPost]);

  //-----------------------ERROR-------------------------------

  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <ErrorMessage error={error} />
      </>
    );
  }

  //----------------------LOADING------------------------------
  if (loading) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <Loading />
      </>
    );
  }

  //-----------------------RETURN-----------------------------
  console.log(posts, "<<----HERE ARE THE POSTS");
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <DisplayPost
            posts={posts}
            isProfile={true}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            addFollower={addFollower}
            removeFollower={removeFollower}
            loggedUser={loggedUser}
            setPosts={setPosts}
            itemsPerRow={1}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}></Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
