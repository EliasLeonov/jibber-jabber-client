import React from "react";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core";

const Post = (props) => {
    return(
        <div style={
            {marginTop:25}
        }>
            <Card>
                <CardHeader title={props.username} subheader={"Date"}/>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.text}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Post