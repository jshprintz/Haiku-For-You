import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";

export default function PageHeader({ loggedUser, handleLogout }) {
  return (
    <Segment clearing>
      <Header as="h2" floated="right">
        <Link to={`/${loggedUser?.username}`}>
          <Image
            src={
              loggedUser?.photoUrl
                ? loggedUser?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            avatar
          ></Image>
        </Link>
        {loggedUser ? (
          <Link to="" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to={`/${loggedUser?.username}`}>Login</Link>
        )}
      </Header>
      <Header as="h2" floated="left">
        <Link to="/">
          <Icon name="home"></Icon>
        </Link>
      </Header>
    </Segment>
  );
}
