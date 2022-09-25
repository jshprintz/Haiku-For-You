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




      console.log(post, "<-------POST")



  return (
    <Card key={post._id} raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header>
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
      )}

      <Card.Content>
        <Card.Description>{post.title}</Card.Description>
        <p>{post.poem}</p>
      </Card.Content>


      <Card.Content extra textAlign={"right"}>
        <Icon
          name={"heart"}
          size="large"
          color={likeColor}
          onClick={clickHandler}
        />
        {post.likes.length} Likes
      </Card.Content>
    </Card>
  );
}

export default PostCard;
