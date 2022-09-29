import React, { useState, useEffect, useCallback } from "react";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
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

  const { username } = useParams();


  //--------------LIKES--------------------------
  async function addLike(postId) {
    try {
      const response = await likesAPI.create(postId);
      console.log(response, "from add like");
      getProfile();
    } catch (err) {
      console.log(err, " err from server");
    }
  }

  async function removeLike(likeId) {
    try {
      const response = await likesAPI.removeLike(likeId);
      console.log(response, " remove like");
      getProfile();
    } catch (err) {
      console.log(err);
    }
  }

  //------------------FOLLOWERS-----------------------
  async function addFollower(userId) {

    try {
      const response = await followersAPI.create(userId);
      console.log(response, "from add follower");
      getProfile();
    } catch (err) {
      console.log(err, " err from server");
    }
  }

  async function removeFollower(followerId) {
    try {
      const response = await followersAPI.removeFollower(followerId);
      console.log(response, " remove follower");
      getProfile();
    } catch (err) {
      console.log(err);
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
  }, [username, getProfile]);


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
  console.log(posts, "HERE IS THE POSTS IN PROFILE")
  return (
    <Grid>
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
      <Grid.Row centered className="profile-posts">
        <Grid.Column style={{ maxWidth: 750 }}>
          <h3>Posts go here</h3>
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
            setProfileUser={setProfileUser}
            itemsPerRow={3}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
