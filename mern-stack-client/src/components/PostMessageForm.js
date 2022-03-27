import React, {useEffect, useState} from "react";
import {Button, TextField, withStyles} from '@material-ui/core'
import useForm from './useForm'
import { connect } from 'react-redux'
import * as actions from "../actions/postMessage.js"



const initialFieldValues = {
    title: '',
    message: ''
}


const styles = theme => ({
    root: {
        '& .MuiTextField-root' : {
            margin: "8px"
        }
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
})
const PostMessageForm = ({classes, ...props}) => {
    var {values, setValues,errors, setErrors, handleInputChange, resetForm} = useForm(initialFieldValues, props.setCurrentId)

    useEffect(() => {
        if(props.currentId != 0){
            setValues({
                ...props.postMessageList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = {...errors}
        temp.title = values.title ? "" : "This field cannot be empty"
        temp.message = values.message ? "" : "This field cannot be empty"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            if(props.currentId == 0){
                alert("Post created successfully")
            }else{
                alert("Post updated successfully")
            }
            resetForm()
        }
        if(validate()){
            if(props.currentId == 0){
                props.createPostMessage(values, onSuccess)
            }else{
                props.updatePostMessage(props.currentId, values, onSuccess)
            }
        }
    }

    return (
        <div>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Post Title"
                    fullWidth
                    value={values.title}
                    onChange={handleInputChange}
                    {...(errors.title && {error: true, helperText: errors.title})}
                >
                </TextField>
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    multiline
                    rows={4}
                    value={values.message}
                    onChange={handleInputChange}
                    {...(errors.title && {error: true, helperText: errors.title})}
                >
                </TextField>
                <Button variant="contained" color="primary" size="large" type="submit">Submit</Button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    postMessageList: state.postMessage.list
})

const mapActionToProps = {
    createPostMessage: actions.create,
    updatePostMessage: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostMessageForm));