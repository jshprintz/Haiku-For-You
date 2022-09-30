import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PageHeader from "../../components/Header/Header";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import PostGallery from "../../components/PostGallery/PostGallery";
import "../App/App.css";

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

  const usersPosts = [];
  const { username } = useParams();


  //--------------LIKES--------------------------
  async function addLike(postId) {
    try {
      const response = await likesAPI.create(postId);
      console.log(response, "from add like");
      getProfile();
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

  //---------------------GET PROFILE----------------------
  const getProfile = useCallback(async () => {

    try {
      const response = await userService.getProfile(username);
      setLoading(false);
      setProfileUser(response.data.user);
      setPosts(response.data.posts);

      console.log(response, "Response");
    } catch (err) {
      console.log(err.message, "<--Error");
      setError("Profile does not exist! You are in the wrong in place.");
    }
  }, [username]);

  useEffect(() => {
    getProfile();
    getFollowing();
  }, [username, getProfile]);



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
        getPosts(following[i].username);
      }
      setFollowingPosts(usersPosts);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setLoading(false);
    }
  }


  

  // Get posts for a specific user
  async function getPosts(username) {
    try {
      const response = await userService.getProfile(username);
      setLoading(false);

        for (let i=0; i<response.data.posts.length; i++){
            usersPosts.push(response.data.posts[i])
        }
      

    } catch (err) {
      console.log(err.message, "<--Error");
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
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={profileUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="feed-gallery">
        <Grid.Column style={{ width: 1000 }}>
          <h1 className="centered">--Recent Posts--</h1>
          <PostGallery
            posts={posts}
            isProfile={true}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            addFollower={addFollower}
            removeFollower={removeFollower}
            loggedUser={loggedUser}
            setPosts={setPosts}
            setFollowingPosts={setFollowingPosts}
            setProfileUser={setProfileUser}
          />
        </Grid.Column>
      </Grid.Row>
      
      <Grid.Row className="feed-gallery">
        <Grid.Column style={{ maxwidth: 350 }}>
          { followingPosts.length ? ( 
          <>
          <h1 className="centered">--Following--</h1>
          <PostGallery
            posts={followingPosts}
            isProfile={true}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            addFollower={addFollower}
            removeFollower={removeFollower}
            loggedUser={loggedUser}
            setPosts={setPosts}
            setFollowingPosts={setFollowingPosts}
            setProfileUser={setProfileUser}
          />
          </>
          ) : <>
              <h1>You aren't following anyone!</h1> 
              <h2> Follow people to keep up with their latest haikus!</h2>
              </>
              }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
