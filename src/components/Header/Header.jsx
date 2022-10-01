import React from "react";
import { Link } from "react-router-dom";
import { Header, Image, Icon, Segment } from "semantic-ui-react";
import "../../pages/App/App.css";

export default function PageHeader({ loggedUser, handleLogout }) {
  return (
    <div className="header-el">
      
      <Header as="h2" floated ="right">
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
      <Icon
            name={"power off"}
            size="large"
            avatar
          ></Icon>
      </Link>
        ) : null}
      </Header>
      <Header as="h2" floated="left">

        {loggedUser ? (
          <>
            <Link to="/more">
                <Icon
                name={"question circle outline"}
                size="large"
                avatar
                />
            </Link>
            <Link to="/write">
            <Icon
                name={"edit"}
                size="large"
                avatar
                />
            </Link>
          </>
        ) : null}
      </Header>
      <br />
      <div className="centered">
      <a href="/" className="large-font-size centered title">Haiku For You</a>
      </div>

    </div>
  );
}
