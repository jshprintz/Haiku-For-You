import React from "react";
import PostGallery from "../PostGallery/PostGallery";
import { Grid } from "semantic-ui-react";

export default function DisplayPostForm({
  posts,
  isProfile,
  addLike,
  removeLike,
  addFollower,
  removeFollower,
  loggedUser,
  setPosts,
  setProfileUser,
}) {

    console.log(posts, "HERE IS POST IN DISPLAYPOST")
  return (
    <Grid>
      <Grid.Row >
        <Grid.Column >
          <div className="details-card">
          <PostGallery
            posts={posts}
            key={posts._id}
            isProfile={isProfile}
            removeLike={removeLike}
            addLike={addLike}
            addFollower={addFollower}
            removeFollower={removeFollower}
            loggedUser={loggedUser}
            setPosts={setPosts}
            setProfileUser={setProfileUser}
          />
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
            <h2>Comments will go here</h2>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
