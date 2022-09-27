import React from "react";
import PostCard from "../PostCard/PostCard";
import { Grid } from "semantic-ui-react";

export default function DisplayPostForm({
  post,
  isProfile,
  addLike,
  removeLike,
  loggedUser,
  setPosts,
  setProfileUser,
}) {
  return (
    <Grid className="details-card">
      <Grid.Row >
        <Grid.Column >
          <PostCard
            post={post}
            key={post._id}
            isProfile={isProfile}
            removeLike={removeLike}
            addLike={addLike}
            loggedUser={loggedUser}
            setPosts={setPosts}
            setProfileUser={setProfileUser}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
