import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PageHeader from "../../components/Header/Header";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import PostGallery from "../../components/PostGallery/PostGallery";
import "../App/App.css";

import * as postsApi from "../../utils/postApi";
import * as followersAPI from "../../utils/followersApi";
import * as likesAPI from "../../utils/likesApi";
import userService from "../../utils/userService";
import { useParams } from "react-router-dom";

export default function ProfilePage({ loggedUser, handleLogout }) {
  const [error, setError] = useState("");
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);

  const { username } = useParams();

  //--------------LIKES--------------------------
  async function addLike(postId) {
    try {
      const response = await likesAPI.create(postId);
      console.log(response, "from add like");
      getProfile();
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
      getProfile();
      getFollowing();
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
      getProfile();
      getFollowing();
    } catch (err) {
      console.log(err, " err from server");
    }
  }

  async function removeFollower(followerId) {
    try {
      const response = await followersAPI.removeFollower(followerId);
      console.log(response, " remove follower");
      getProfile();
      getFollowing();
    } catch (err) {
      console.log(err, "remove follower error");
    }
  }

  //--------------------------DELETE POST------------------------------

  async function removePost(postId) {
    try {
      postsApi.deletePost(postId);
      getProfile();
      getFollowing();
      setLoading(false);
    } catch (err) {
      console.log("err", "This is the error");
      setError(err);
      setLoading(false);
    }
  }

  //---------------------GET PROFILE----------------------
  const getProfile = useCallback(async () => {
    try {
      const response = await userService.getProfile(username);
      setLoading(false);
      setProfileUser(response.data.user);
      setPosts(...[response.data.posts]);
    } catch (err) {
      console.log(err.message, "<--Error");
      setError("Profile does not exist! You are in the wrong in place.");
    }
  }, [username]);

  useEffect(() => {
    getProfile();
    getFollowing();
  }, [username]);

  //---------------------------GET FOLLOWING---------------------

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

      const responsePromise = await Promise.all(following);

      const everyonesPosts = responsePromise
        .map(({ data }) => {
          return data.posts;
        })
        .flat();

      const followPosts = [];

      // Refactor using .filter

      for (let i = 0; i < everyonesPosts.length; i++) {
        const checkPost = everyonesPosts[i].user.followers.findIndex(function (
          follower
        ) {
          return follower.username === loggedUser?.username;
        });

        if (checkPost > -1) followPosts.push(everyonesPosts[i]);
      }

      setFollowingPosts(followPosts);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setLoading(false);
    }
  }

  //-----------------------ERROR-------------------------------

  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <ErrorMessage error={error} />;
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
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="header-clearance">
        <Grid.Column>
          <ProfileBio user={profileUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="feed-gallery">
        <Grid.Column style={{ width: 1000 }}>
          <p className="centered medium-font-size">Recent Posts</p>
          <PostGallery
            posts={posts}
            isProfile={true}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            addFollower={addFollower}
            removeFollower={removeFollower}
            loggedUser={loggedUser}
            removePost={removePost}
          />
        </Grid.Column>
      </Grid.Row>

      {loggedUser?.username === username ? (
        <Grid.Row className="feed-gallery">
          <Grid.Column style={{ maxwidth: 350 }}>
            {followingPosts.length ? (
              <>
                <p className="centered medium-font-size">Following</p>
                <PostGallery
                  posts={followingPosts}
                  isProfile={true}
                  loading={loading}
                  addLike={addLike}
                  removeLike={removeLike}
                  addFollower={addFollower}
                  removeFollower={removeFollower}
                  loggedUser={loggedUser}
                  removePost={removePost}
                />
              </>
            ) : (
              <>
                <p className="medium-font-size">You aren't following anyone!</p>
                <p className="medium-font-size">
                  {" "}
                  Follow people to keep up with their latest haikus!
                </p>
              </>
            )}
          </Grid.Column>
        </Grid.Row>
      ) : null}
    </Grid>
  );
}
