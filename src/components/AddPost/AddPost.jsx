import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";


export default function AddPostForm(props) {

  const [state, setState] = useState({
    title: '',
    poem: '',
  });

  function handleChange(e) {
    console.log(state.title);
    console.log(state.poem);
    setState({
        ...state,
        [e.target.name]: e.target.value,
    });
  }



  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    

    // These are correct
    console.log(state.title, "<--Title");
    console.log(state.poem, "<--poem");

    formData.append("title", state.title);
    formData.append("poem", state.poem);

    console.log(
      formData.forEach((item) => console.log(item, "<--item"))
    );

    try {
        await props.handleAddPost(formData);
        
    } catch(err) {
        console.log(err, "<-- in Addpost handlesubmit")
    }
    
  }

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="title"
          value={state.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <Form.TextArea
          className="form-control"
          name="poem"
          value={state.poem}
          placeholder="Write Haiku Here"
          onChange={handleChange}
          required
        />
        <Button type="submit" className="btn">
          Post Haiku
        </Button>
      </Form>
    </Segment>
  );
}
