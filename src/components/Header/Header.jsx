import React from "react";
import { Link } from "react-router-dom";
import { Header, Image, Icon, Segment } from "semantic-ui-react";
import "../../pages/App/App.css";

export default function PageHeader({ loggedUser, handleLogout }) {
  return (
    <Segment clearing raised className="header-el">
      <Header as="h2" floated="right">
        <Link to={`/${loggedUser?.username}`}>
          <Image
            src={
              loggedUser?.photoUrl
                ? loggedUser?.photoUrl
                : "https://i.imgur.com/L7SHYEM.png"
            }
            avatar
          ></Image>
        </Link>
        {loggedUser ? (
      <Link to="" onClick={handleLogout}>
      <Image
            src={"https://i.imgur.com/IjIFulH.png"}
            avatar
          ></Image>
      </Link>
        ) : null}
      </Header>
      <Header as="h2" floated="left">
        <Link to="/">
          <Icon name="home" size="large"></Icon>
        </Link>

        {loggedUser ? (
          <>
            <Link to="/more">More</Link>
            <Link to="/write">Write a Haiku</Link>
          </>
        ) : null}
      </Header>
    </Segment>
  );
}
