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


  // DELETE
  const deleteClickHandler = () => {
    deletePost(post._id);
    isProfile ? getProfile() : getPosts();
  };


  // FEED PAGE
  async function getPosts() {
    try {
      const response = await postsAPI.getAll();
      console.log(response, "<-- Response");
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

      console.log(response, "<<Response>>");
    } catch (err) {
      console.log(err.message, "<--Error");
    }
  }, [username]);





  // DETAILS PAGE
  const getProfileByID = useCallback(async () => {
    console.log(post.user, "USER ID")
    try {
      const response = await userService.getProfileByID(post.user);

      setUserPost(response.data.user)
      //HERE'S WHERE THE ERROR IS
      // setProfileUser(response.data.user);
      // setPosts(response.data.posts);

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



  console.log(isProfile, "<---ISPROFILE")
  console.log(post, "<--POST")
  console.log(userPost, "<---userpost")

  return (
    <Card key={post._id} href={`/details/${post._id}`}>
      <Card.Content className="card">
        <Card.Header textAlign="center">
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
        </Card.Header>
        <br />
          <Card.Header>{post.title}</Card.Header>
          <Card.Description>{post.lineOne}</Card.Description>
          <Card.Description>{post.lineTwo}</Card.Description>
          <Card.Description>{post.lineThree}</Card.Description>
      </Card.Content>

      {loggedUser ? (
        <Card.Content textAlign={"right"}>
          {post.user.username === loggedUser?.username ? (
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
                  color={"blue"}
                  //onClick={followClickHandler}
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
