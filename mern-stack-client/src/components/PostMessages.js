import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import * as actions from "../actions/postMessage.js"
import {Divider, Grid, List, ListItem, ListItemText, Paper, Typography, withStyles, Button} from '@material-ui/core'
import PostMessageForm from './PostMessageForm'

const styles = theme => ({
    paper: {
        margin: "24px",
        padding: "16px"
    },
    buttons: {
        margin: "10px"
    }
})

const PostMessages = ({classes, ...props}) => {

    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllPostMessages()
    }, [])

    const onDelete = id => {
        const onSuccess = () => {
            alert('Post deleted successfully')
        }
        if(window.confirm("Are you sure you want to delete this record?")){
            props.deletePostMessage(id, onSuccess)
        }
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <PostMessageForm {...{currentId, setCurrentId}}></PostMessageForm>

                    </Paper>
                </Grid>
                <Grid item xs={7}>
                    <Paper className={classes.paper}>
                        <List>
                            {
                                props.postMessageList.map((record, index) => {
                                    return(
                                        <div key={index}>
                                            <ListItem>
                                                <ListItemText>
                                                    <Typography variant="h5">
                                                        {record.title}
                                                    </Typography>
                                                    <div>
                                                        {record.message}
                                                    </div>
                                                    <div>
                                                        <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        className={classes.buttons}
                                                        onClick={()=>setCurrentId(record._id)}
                                                        >Edit</Button>
                                                        <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        size="small"
                                                        className={classes.buttons}
                                                        onClick={()=>onDelete(record._id)}
                                                        >Delete</Button>
                                                    </div>
                                                </ListItemText>
                                            </ListItem>
                                            <Divider component="li"></Divider>
                                        </div>
                                    )
                                })
                            }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
    postMessageList: state.postMessage.list
})

const mapActionToProps = {
    fetchAllPostMessages: actions.fetchAll,
    deletePostMessage: actions.deletePost
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(PostMessages));