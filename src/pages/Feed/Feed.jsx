import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import Following from "../../components/Following/Following";
import PostGallery from "../../components/PostGallery/PostGallery";
import "../App/App.css";

import { Grid } from "semantic-ui-react";

import * as followersAPI from "../../utils/followersApi";
import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likesApi";


export default function Feed({ loggedUser, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


//-----------------------------LIKES--------------------------------
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

//-------------------------------FOLLOWERS---------------------------
  async function addFollower(userId) {

    try {
      const response = await followersAPI.create(userId);
      console.log(response, "from add follower");
      getPosts();
    } catch (err) {
      console.log(err, " err from server");
    }
  }

  async function removeFollower(followerId) {
    try {
      const response = await followersAPI.removeFollower(followerId);
      console.log(response, " remove follower");
      getPosts();
    } catch (err) {
      console.log(err);
    }
  }

//---------------------------GET POSTS--------------------------------
  async function getPosts() {
    try {
      const response = await postsAPI.getAll();
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

  //------------------------Error--------Loading-----------------------

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

  //--------------------------RETURN-------------------------------------
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="feed-gallery">
        <Grid.Column style={{ maxwidth: 350 }}>
          <h1>Here are all the posts</h1>
          <PostGallery
            posts={posts}
            isProfile={false}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            addFollower={addFollower}
            removeFollower={removeFollower}
            loggedUser={loggedUser}
            setPosts={setPosts}
            itemsPerRow={3}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="feed-gallery">
        <Grid.Column style={{ maxwidth: 350 }}>
          <h1>Here are posts from people you're following</h1>
          <Following
            isProfile={false}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            addFollower={addFollower}
            removeFollower={removeFollower}
            loggedUser={loggedUser}
            setPosts={setPosts}
            itemsPerRow={3}
            handleLogout={handleLogout}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
