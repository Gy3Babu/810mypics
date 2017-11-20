var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),
mongoose = require ('mongoose'),
Pics = mongoose.model('pics');

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/pics/user/:userID', function (req, res, next){
        logger.log('Get all pics', 'verbose');
        
        var query = Pics.find({userID:req.params.userID})
        .sort(req.query.order)
        .exec()
        .then(result => {
          if(result && result.length) {
              res.status(200).json(result);
          } else {
              res.status(404).json({message: "No Pics"});
          }
        })
        .catch(err=> {
            return next(err);
        });
    });

    router.get('/pics/:picID', function (req, res, next){
        logger.log('Get user' + req.params.picID, 'verbose');

        Pics.findById(req.params.picID)
        .then(Pic=> {
            if(Pic){
                res.status(200).json(Pic);
            } else {
                res.status(404).json({message: "No Pic found"});

            }
        })
        .catch(error => {
                return next(error);
        });
    });

    router.post('/pics', function(req, res, next){
        logger.log('Create a Pic', 'verbose');

        var Pic = new Pics(req.body);
        Pic.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch( err => {
            return next(err); 
        });
    });

    router.put('/pics/:picID', function (req, res, next){
        logger.log('Update Pic with id Pic id'+ req.params.picID, 'verbose')

        Pics.findOneAndUpdate({_id: req.params.picID},
        req.body, {new:true, multi:false})
            .then(Pic => {
                res.status(200).json(Pic);
            })
            .catch(error => {
                return next(error);
            });
    });

    router.delete('/pics/:picID', function (req, res, next){
        logger.log ('Delete Pic with id PicID + req.params.PicID', 'verbose');

        Pics.remove({_id: req.params.picID})
        .then(Pics => {
            res.status(200).json({mesg:"Pic Deleted"});
        })
        .catch(error => {
            return next(error);
        });
    });

};





