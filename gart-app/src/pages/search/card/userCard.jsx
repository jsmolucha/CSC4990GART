//This component will render username in a clean fasion for search purposes
//can be recycled to display followers
//Username + random icon or previous post + links to their account and maybe a follow button
import React, { useEffect, useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
  } from "@material-ui/core/";
const UserCard = ({ username }) => {
    

    return(
        <>
        <Card>
            <h1>@{username}</h1>
        </Card>
        </>
    )
}

export default UserCard 