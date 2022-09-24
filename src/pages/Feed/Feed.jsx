import React, { useState } from 'react'
import PageHeader from "../../components/Header/Header"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { Grid, GridColumn } from "semantic-ui-react"


export default function Feed({ loggedUser, handleLogout }) {
    const [error, setError] = useState("");


    if (error) {
        return (
            <>
                <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
                <ErrorMessage error={error} />
            </>
        );
    };
    
    
    
    
    return(
        <Grid centered>
            <Grid.Row>
                <GridColumn>
                    <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
                </GridColumn>
            </Grid.Row>
            <Grid.Row>
                <GridColumn>
                    <h1>This is the Feed page (Home) </h1>
                </GridColumn>
            </Grid.Row>

        </Grid>
    )
}