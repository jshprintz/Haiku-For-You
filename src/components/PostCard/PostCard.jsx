import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";



function PostCard({ post, isProfile, addLike, removeLike, loggedUser }) {

  const likedIndex = post.likes.findIndex(
    (like) => like.username === loggedUser.username
  );


  const likeColor = likedIndex > -1 ? "red" : "grey";
                     
  const clickHandler =
    likedIndex > -1
      ? () => removeLike(post.likes[likedIndex]._id) 
      : () => addLike(post._id);  

  return (
    <Card key={post._id} >
      {/* {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header textAlign="left">
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
        </Card.Content>
      )} */}

      <Card.Content>
        <Card.Header>{post.title}</Card.Header>
        <p>{post.poem}</p>
      </Card.Content>


      <Card.Content textAlign={"right"}>
      <Card.Header textAlign="left">
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
        <Icon
          name={"heart"}
          size="small"
          color={likeColor}
          onClick={clickHandler}
        />
        {post.likes.length} Likes
      </Card.Content>
    </Card>
  );
}

export default PostCard;
