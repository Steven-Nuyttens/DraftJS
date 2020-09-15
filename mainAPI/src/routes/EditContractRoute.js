const express = require('express');
const router = express.Router();
const EditContract = require('../models/')




router.get('/EditContract', function(req, res) {
    EditContract.find({})
    .then(function(form) {
        res.send(form)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });
});




router.post('/EditContract', function(req, res){
    console.log(req.body);
    EditContract.create({text:req.body.text})
    .then(function(form) {
         res.send(form)

    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });
});




module.exports = router;