import React from "react";
import { Segment } from "semantic-ui-react";
import * as postsAPI from "../../utils/postApi";

export default function DisplayPostForm({ post }) {
    console.log(post, "HERE IS THE POST IN THE COMPONENT")
    console.log(postsAPI)

  return (
    <Segment>
        <h1>The component</h1>
    </Segment>
  );
}
