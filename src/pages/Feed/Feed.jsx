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
    getFollowing();
  }, []);



  async function getFollowing() {
    try {
      const response = await userService.index();
      const following = [];

      console.log(response, "<<--ALLL USERS>>");

      // Check every users followers to see if it contains logged in user
      response.data.map((user) => {
        for (let i = 0; i < user.followers.length; i++) {
          if (user.followers[i].username === loggedUser?.username) {
            following.push(user);
          }
        }
        return following;
      });

      console.log(
        following,
        "HERE ARE THE users that the logged user is following"
      );

      // fetching posts for users that the logged in user is following.
      for (let i = 0; i < following.length; i++) {
        getUserPosts(following[i].username);
      }
      setFollowingPosts(usersPosts);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setLoading(false);
    }
  }


  // Get posts for a specific user
  async function getUserPosts(username) {
    try {
      const response = await userService.getProfile(username);
      console.log(response, "PAY ATTENTION TO THIS RESPONSE")
      setLoading(false);

        for (let i=0; i<response.data.posts.length; i++){
            usersPosts.push(response.data.posts[i])
        }
      

    } catch (err) {
      console.log(err.message, "<--Error");
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
            itemsPerRow={3}
            handleLogout={handleLogout}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
