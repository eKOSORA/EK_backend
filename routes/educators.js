const express = require('express')
const app = express.Router()
const path = require('path')
const {_remove, _pick, arr_remove} = require('../oneliners')



app.post('/register', (req, res)=>{
    // console.log(req.body)
    // return res.json({code: "#Success"})
    if((req.body.prefix != 'educator') || !req.body.AdP) return res.status(403).json({code: "#NoPrivileges", message: "This feature is reserved for admin educators"})
    
    const newEducator = require('../models/ml-educator')({
        names: req.body.names,
        code: req.body.code,
        title: req.body.title,
        lessons: req.body.lessons,
        email: req.body.email,
        tel: req.body.tel,
        password: "password@123"
    })
    newEducator.save((err, doc)=>{
        if(err) return res.status(500).json({code: "#Error", message: err})
        res.json({code: "#Success"})
    })
})

app.get('/view', (req, res)=>{
    require('../models/ml-educator').find({}, (err, result)=>{
        if(err) return res.status(500).json({code: "#InternalServerError", message: err})
        let doc = []
        for(let {_doc: educator} of result){
            // console.dir(educator)
            let ed = {}
            Object.keys(educator).map(x=>{
                if(["__v", "password"].includes(x)) return
                return ed[x] = educator[x]
            })
            doc.push(ed)
        }
        res.json({code: "#Success", doc})
    })
})

//TODO: Not documented YET

app.get('/getOne', (req, res)=>{
    require('../models/ml-educator').findOne({_id: req.query.id}, (err, doc)=>{
        if(err) return res.json({code: "#Error", message: err})
        if(!doc) return res.json({code: "#NotFound"})
        res.json({code: "#Success", doc})
    })
})



app.post('/edit', (req,res)=>{
    if(!req.body.AdP) return res.json({code: "#NoAdminPrivileges"})
    if(!req.query.id) return res.json({code: "#NoIDProvided"})
    require('../models/ml-educator').updateOne({_id: req.query.id}, _pick(["names", "code", "title", "lessons", "email", "tel"], req.body), (err, doc)=>{
        if(err) return res.status(50).json({code: "#InternalServerError", message: err})
        res.json({code: "#Success", doc})
    })

})

app.get('/delete', (req, res)=>{
    if(!req.body.AdP) return res.json({code: "#NoAdminPrivileges"})
    if(!req.query.id) return res.json({code: "#NoIDProvided"})
    require('../models/ml-educator').deleteOne({_id: req.query.id}, (err, doc)=>{
        if(err) return res.json({code: "#Error", message: err})
        res.json({code: "#Success", doc})
    })
})

module.exports = app