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
  itemsPerRow,
}) {
  return (
    <Grid >
      <Grid.Row >
        <Grid.Column centered style={{ width: 450 }}>
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
              itemsPerRow={itemsPerRow}
            />
          </div>
        </Grid.Column>
        <Grid.Column style={{ width: 450 }}>
          
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
