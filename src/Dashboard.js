import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';

const testApi = () => {
    fetch("https://api.amosed.ro/api/activities/add", {
        method: "POST",
        body: JSON.stringify({
            activity_name: "sedinta departa",
            date: "2020-09-02 11:00:00",
            duration: 120,
            organizer: "iulia bombardiera"
        }),
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
    })
    .catch(error => console.log(error));
}

export default () => (
    <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>Lorem ipsum sic dolor amet...</CardContent>
        <button onClick={() => testApi()}>Apasa aci</button>
    </Card>
);