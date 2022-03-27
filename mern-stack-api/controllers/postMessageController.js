const { request } = require('express')
const express = require('express')

var router = express.Router()
var { PostMessage } = require('../models/postMessage')

var ObjectID = require('mongoose').Types.ObjectId

router.get('/', (req, res) => {
    PostMessage.find((err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving data')
        }
    })
})

router.post('/', (req, res) => {
    var newRecord = new PostMessage({
        title: req.body.title,
        message: req.body.message
    })

    newRecord.save((err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while creating record')
        }
    })
})

router.put('/:id',(req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id:   ${req.params.id}`)
    }

    var updatedRecord = {
        title: req.body.title,
        message: req.body.message
    }

    PostMessage.findByIdAndUpdate(req.params.id, {$set: updatedRecord}, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while updating record')
        }
    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    PostMessage.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while deleting record')
        }
    })
})

module.exports = router