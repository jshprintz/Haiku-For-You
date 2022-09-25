import React, { useState } from 'react'
import PageHeader from '../../components/Header/Header'
import AddPost from "../../components/AddPost/AddPost";

import { Grid } from 'semantic-ui-react'
import * as postsAPI from '../../utils/postApi'

export default function More({ loggedUser, handleLogout}){
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); 

    async function handleAddPost(post) {
        // post, is coming from the addPostForm component, when we call this function onSubmit props.handleAddPost(formData)
        try {
          setLoading(true);
          const response = await postsAPI.create(post); // waiting for the json to be return from the server and parsed by us!
    
          // data is the response from the api, the result of the .then if(res.ok) return res.json() in the create postAPI utils function
          console.log(response, "<--- HERE IS THE RESPONSE");
          setPosts([response.data, ...posts]); /// ...posts would keep all the posts in the previous states array
          setLoading(false);
        } catch (err) {
          // this is the error from the throw block, in the postsAPI.create function
          console.log(err.message, "<---ERROR IN WRITE.JSX");
          setError("Error creating post, please try again");
        }
      }


    return (
        <Grid centered>
        <Grid.Row>
          <Grid.Column>
            <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <h1>Write a Haiku</h1>
            <p>{error}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPost handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>

      </Grid>
    )
}