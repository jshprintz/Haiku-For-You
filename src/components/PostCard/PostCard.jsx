import React, { useCallback } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { deletePost } from "../../utils/postApi";
import * as postsAPI from "../../utils/postApi";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const likedIndex = post.likes.findIndex(
    (like) => like.username === loggedUser.username
  );
  const likeColor = likedIndex > -1 ? "pink" : "grey";

  const likeClickHandler =
    likedIndex > -1
      ? () => removeLike(post.likes[likedIndex]._id)
      : () => addLike(post._id);

  const deleteClickHandler = () => {
    deletePost(post._id);

    if (isProfile) {
      getProfile();
    } else {
      getPosts();
    }
  };

  async function getPosts() {
    try {
      const response = await postsAPI.getAll();
      console.log(response, "<-- Response");
      setPosts([...response.data]);
    } catch (err) {
      console.log(err.message, " this is the error");
    }
  }

  const { username } = useParams();
  const getProfile = useCallback(async () => {
    try {
      const response = await userService.getProfile(username);
      setProfileUser(response.data.user);
      setPosts(response.data.posts);

      console.log(response, "Response");
    } catch (err) {
      console.log(err.message, "<--Error");
    }
  }, [username]);

  //--------------------------------------------------------
  //  FOLLOW. PROBABLY WILL NEED TO CHANGE THE USER MODEL.

  // const followIndex = loggedUser.follow.findIndex(
  //   (follow) => follow.username === loggedUser.username
  // );
  // const followColor = followIndex > -1 ? "blue" : "grey";

  // const followClickHandler =
  // likedIndex > -1 ?
  //    () => removeLike(post.follow[followIndex]._id)
  //   : () => addLike(post._id);
  //---------------------------------------------------------

  return (
    
      <Card key={post._id} href={`/details/${post._id}`} >
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
          <p>{post.poem}</p>
        </Card.Content>

        <Card.Content textAlign={"right"} >
          {post.user.username === loggedUser.username ? (
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
      </Card>
    
  );
}

export default PostCard;
