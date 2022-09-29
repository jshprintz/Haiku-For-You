import React, { useCallback, useEffect, useState } from "react";
import { Card, Icon, Image, Segment } from "semantic-ui-react";
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
  //const usersPosts = [];
  const [userPost, setUserPost] = useState({});

  // LIKES
  const likedIndex = post.likes.findIndex(
    (like) => like.username === loggedUser?.username
  );

  const likeColor = likedIndex > -1 ? "green" : "grey";

  const likeClickHandler =
    likedIndex > -1
      ? () => removeLike(post.likes[likedIndex]._id)
      : () => addLike(post._id);

  // FOLLOWERS
  const followerIndex = post.user.followers.findIndex(function (follower) {
    return follower.username === loggedUser?.username;
  });

  const followerColor = followerIndex > -1 ? "red" : "blue";
  const followerIcon = followerIndex > -1 ? "user times" : "user plus";
  const followerClickHandler =
    followerIndex > -1
      ? () => removeFollower(post.user.followers[followerIndex]._id)
      : () => addFollower(post.user._id);




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
      const response = await userService.getProfileByID(post.user._id);

      setUserPost(response.data.user);
    } catch (err) {
      console.log(err.message, "<--Error");
    }
  }, [post.user]);



  // ON PAGE LOAD
  useEffect(() => {
    console.log("firing");

    if (isProfile) {
      if (username !== undefined) {
        //PROFILE PAGE
        getProfile();
      } else {
        //DETAILS PAGE
        getProfileByID();
      }
    } else {
      //FEED PAGE
      getPosts();
    }
  }, [followerColor]);




console.log(post, "HERE IS THE POST")
console.log(new Date(post.createdAt))
const tempTimestamp = new Date(post.createdAt)
console.log(tempTimestamp.toLocaleDateString())
const timestamp = tempTimestamp.toLocaleDateString()

  return (
    <Card key={post._id} href={`/details/${post._id}`}>
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
          <Segment raised>
            <Card.Description textAlign="left">{timestamp}</Card.Description>
          {post.user.username === loggedUser?.username ||
          (userPost._id === post.user &&
            userPost.username === loggedUser?.username) ? (
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
                  name={"thumbs up"}
                  size="large"
                  color={likeColor}
                  onClick={likeClickHandler}
                />
              </Link>
              {post.likes.length}

              <Link to={`#`}>
                <Icon
                  name={followerIcon}
                  size="large"
                  color={followerColor}
                  onClick={followerClickHandler}
                />
              </Link>
            </>
          )}
          </Segment>
        </Card.Content>
      ) : null}
    </Card>
  );
}

export default PostCard;
