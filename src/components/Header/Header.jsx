import React from "react";
import { Link } from "react-router-dom";
import { Header, Image, Icon, Grid } from "semantic-ui-react";
import "../../pages/App/App.css";

export default function PageHeader({ loggedUser, handleLogout }) {
  return (
    <Grid textAlign="center">
          <div className="header-el">

          <Grid.Row>
            <Header as="h3" floated="right">
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
                  <Icon name={"power off"} size="large" avatar></Icon>
                </Link>
              ) : null}
            </Header>
            <Header as="h3" floated="left">
              <>
                <Link to="/more">
                  <Icon name={"question circle outline"} size="large" avatar />
                </Link>

                {loggedUser ? (
                  <Link to="/write">
                    <Icon name={"edit"} size="large" avatar />
                  </Link>
                ) : null}
              </>
            </Header>
            </Grid.Row>


            <Grid.Row centered>
            <div className="centered nav-title">
              <a href="/" className="large-font-size centered title">
                Haiku For You
              </a>
            </div>
            </Grid.Row>
          </div>
        
      
    </Grid>
  );
}
