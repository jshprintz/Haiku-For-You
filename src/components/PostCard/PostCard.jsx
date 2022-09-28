import React, { useCallback, useEffect, useState } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { deletePost } from "../../utils/postApi";
import * as postsAPI from "../../utils/postApi";
import { useParams } from "react-router-dom";
import userService from "../../utils/userService";

function PostCard({
  post,
  isProfile,
  addLike,
  removeLike,
  addFollower,
  removeFollower,
  loggedUser,
  setPosts,
  setProfileUser,
}) {
  const { username } = useParams();
  const [userPost, setUserPost] = useState({})


  // LIKES
  const likedIndex = post.likes.findIndex(
    (like) => like.username === loggedUser?.username
  );
  const likeColor = likedIndex > -1 ? "pink" : "grey";

  const likeClickHandler =
    likedIndex > -1
      ? () => removeLike(post.likes[likedIndex]._id)
      : () => addLike(post._id);


//----------------------------------------------------------------
  // FOLLOWERS

  // I think here is where the logic is wrong. We're sending up the wrong 
  // value through the chain. THe chain is fine, it's this that's wrong.

  const followerIndex = loggedUser.followers.findIndex(
    (follower) => follower.username === loggedUser?.username
  );

console.log(followerIndex, "<- THIS IS THE FOLLOWER INDEX")
console.log(loggedUser, "This is the logged user")

  const followerColor = followerIndex > -1 ? "green" : "blue";

  const followerClickHandler =
    followerIndex > -1
      ? () => removeFollower(loggedUser.followers[followerIndex]._id)
      : () => addFollower(post.user._id);

//----------------------------------------------------------------
      




  // DELETE
  const deleteClickHandler = () => {
    deletePost(post._id);
    isProfile ? getProfile() : getPosts();
  };


  // FEED PAGE
  async function getPosts() {
    try {
      const response = await postsAPI.getAll();
      setPosts([...response.data]);
    } catch (err) {
      console.log(err.message, " this is the error");
    }
  }

  // PROFILE PAGE
  const getProfile = useCallback(async () => {
    try {
      const response = await userService.getProfile(username);
      setProfileUser(response.data.user);
      setPosts(response.data.posts);
    } catch (err) {
      console.log(err.message, "<--Error");
    }
  }, [username]);





  // DETAILS PAGE
  const getProfileByID = useCallback(async () => {
    try {
      const response = await userService.getProfileByID(post.user);

      setUserPost(response.data.user)

      console.log(response, "<<Response>>");
    } catch (err) {
      console.log(err.message, "<--Error");
    }
  }, [post.user]);




  // ON PAGE LOAD
  useEffect(() => {
    if (isProfile) {
      if (username !== undefined) {
        getProfile()
      } else {
        getProfileByID()
      }
    } else {
      getPosts()
    }
  }, []);

  return (
    <Card key={post._id} href={`/details/${post._id}`} centered>
      <Card.Content className="card">
        <Card.Header textAlign="center">
          {userPost._id === post.user ? (
              <Link to={`/${userPost.username}`}>
              <Image
                size="large"
                avatar
                src={
                  userPost.photoUrl
                    ? userPost.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              {userPost.username}
            </Link>
          ) : (
          <Link to={`/${post.user.username}`}>
            <Image
              size="large"
              avatar
              src={
                post.user.photoUrl
                  ? post.user.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              }
            />
            {post.user.username}
          </Link>
        )}
        </Card.Header>

        <br />
          <Card.Header textAlign="center">{post.title}</Card.Header>
          <br />
          <Card.Description textAlign="left">{post.lineOne}</Card.Description>
          <Card.Description textAlign="left">{post.lineTwo}</Card.Description>
          <Card.Description textAlign="left">{post.lineThree}</Card.Description>
      </Card.Content>

      {loggedUser ? (
        <Card.Content textAlign={"right"}>
          {(post.user.username === loggedUser?.username) || ((userPost._id === post.user) && (userPost.username === loggedUser?.username)) ? (
            <Link to={`#`}>
              <Icon
                name={"delete"}
                size="large"
                color={"red"}
                onClick={deleteClickHandler}
              />
            </Link>
          ) : (
            <>
              <Link to={`#`}>
                <Icon
                  name={"heart"}
                  size="large"
                  color={likeColor}
                  onClick={likeClickHandler}
                />
              </Link>
              {post.likes.length}

              <Link to={`#`}>
                <Icon
                  name={"user plus"}
                  size="large"
                  color={followerColor}
                  onClick={followerClickHandler}
                />
              </Link>
            </>
          )}
        </Card.Content>
      ) : null}
    </Card>
  );
}

export default PostCard;
