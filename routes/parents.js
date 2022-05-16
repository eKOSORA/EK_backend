const express = require('express')
const app = express.Router()
const path = require("path")



app.post('/getParentInfo', async (req, res)=>{
    // console.log(req.query)
    try{
        require("../models/ml-parent").findOne({_id: req.body._id}, async (err, doc)=>{
            if(err) return res.status(500).json({code: "#InternalServerError", message: err})
            if(!doc) return res.status(404).json({code: "#NoSuchID"})
            let toSend = doc._doc
            let children = await require('../models/ml-student').find({_id: {$in: toSend.children}})
            toSend.children = children.map(x => {
                return {
                    names: x.names,
                    code: x.code,
                    email: x.email
                }
            })
            res.json({code: "#Success", doc: toSend})
        })
    }catch(e){
        res.json({code: "#Error", message: e})
    }
})

app.post('/signup', async (req, res)=>{
    if(!req.body._id) return res.json({code: "#NoID"})
    try{
        console.log("Updating the parent")
        let updatedParent = await require("../models/ml-parent").updateOne({_id: req.query._id}, {
            names: req.body.names,
            tel: req.body.tel,
            password: req.body.password
        })
        if(updatedParent.matchedCount == 0) return res.json({code: "#NoSuchID"})
        res.json({code: "#Success", doc: updatedParent})
    }catch(e){
        res.status(500).json({code: "#IntervalServerError", message: e})
    }
})

module.exports = app