const UserProfile = require('../models/UserProfileModel');
const express = require('express');
const router = express.Router();
const validation = require('../middleware/middleware.js');
const checkToken = validation.checkToken;





router.get('/user/data', checkToken, (req, res) => {
    //verify the JWT token generated for the user
    //console.log(req)
    jwt.verify(req.token, secret, (err, authorizedData) => {
        if(err){
          console.log(err)
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
      
            UserProfile.findOne({ eMail: authorizedData.eMail})
            .then(userProfile => {
                userProfile.pswd = ''
                userProfile._id = ''
            return res.status(200).json( userProfile )
  
            })
            .catch( err => {
              console.error(err)
              return res.status(400).json({ errors: err })
          });
  
        }
    })
  });

router.post('/user/details', checkToken, (req, res) => {
    //verify the JWT token generated for the user
    //console.log(req)
      jwt.verify(req.token, secret, (err, authorizedData) => {
        if(err){
          console.log(err)
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            UserProfile.findOneAndUpdate({ eMail: authorizedData.eMail}, {
              name:req.body.name,
              jobTitle: req.body.jobTitle,
              description: req.body.description,
              skillList: req.body.skillList,
              experience: req.body.experience,
              formations: req.body.formations,
              
  
            })
            .then(userProfile => {
              console.log(userProfile)
              return res.status(200).json( userProfile )
            })
            .catch( err => {
              console.error(err)
              return res.status(400).json({ errors: err })
          });
            console.log('SUCCESS: Connected to protected route');
        }
    })
  });



module.exports = router;
