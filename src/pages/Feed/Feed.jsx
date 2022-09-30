import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";

import PostGallery from "../../components/PostGallery/PostGallery";
import "../App/App.css";

import { Grid } from "semantic-ui-react";

import * as followersAPI from "../../utils/followersApi";
import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likesApi";
import userService from "../../utils/userService";

export default function Feed({ loggedUser, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [followingPosts, setFollowingPosts] = useState([]);

  const usersPosts = [];

  //-----------------------------LIKES--------------------------------
  async function addLike(postId) {
    try {
      const response = await likesAPI.create(postId);
      console.log(response, "from add like");
      getPosts();
      getFollowing();
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
      getFollowing();
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
      getFollowing();
    } catch (err) {
      console.log(err, " err from server");
    }
  }

  async function removeFollower(followerId) {
    try {
      const response = await followersAPI.removeFollower(followerId);
      console.log(response, " remove follower");
      getPosts();
      getFollowing();
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
    getFollowing();
  }, []);

  //----------------------------GET FOLLOWING-----------------------

  async function getFollowing() {
    try {
      const response = await userService.index();

      // Check every users followers to see if it contains logged in user
      const following = response.data
        .filter((user) => {
          return user.username !== loggedUser?.username;
        })
        .map((user) => {
          return userService.getProfile(user.username);
        });
      const responsePromise = await Promise.all(following)
      
      const followersPosts = responsePromise.map(({ data }) => {
        return data.posts
      }).flat()

      setFollowingPosts(followersPosts);

      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setLoading(false);
    }
  }

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
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column>
            <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="feed-gallery">
          <Grid.Column style={{ maxwidth: 350 }}>
            <h1 className="centered">--Recent Posts--</h1>
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
            />
          </Grid.Column>
        </Grid.Row>
        {loggedUser ? (
          <Grid.Row className="feed-gallery">
            <Grid.Column style={{ maxwidth: 350 }}>
              {followingPosts.length ? (
                <>
                  <h1 className="centered">--Following--</h1>
                  <PostGallery
                    posts={followingPosts}
                    isProfile={false}
                    loading={loading}
                    addLike={addLike}
                    removeLike={removeLike}
                    addFollower={addFollower}
                    removeFollower={removeFollower}
                    loggedUser={loggedUser}
                    setPosts={setPosts}
                    setFollowingPosts={setFollowingPosts}
                  />
                </>
              ) : (
                <>
                  <h1>You aren't following anyone!</h1>
                  <h2> Follow people to keep up with their latest haikus!</h2>
                </>
              )}
            </Grid.Column>
          </Grid.Row>
        ) : null}
      </Grid>
      <br />
      <br />
      <br />
    </>
  );
}
