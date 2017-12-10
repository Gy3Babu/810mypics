var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),
mongoose = require ('mongoose'),
Pics = mongoose.model('pics'),
passport = require('passport'),
multer = require('multer'),
mkdirp = require('mkdirp');

var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
  app.use('/api', router);

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {      
      var path = config.uploads + req.params.userId + "/";
      mkdirp(path, function(err) {
      if(err){
        res.status(500).json(err);
      } else {
        cb(null, path);
      }
    });
    },
    filename: function (req, file, cb) {
      let fileName = file.originalname.split('.');   
      cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
    }
  });


  var upload = multer({ storage: storage });


router.post('/pics/upload/:userId/:picID', upload.any(), function(req, res, next){
    logger.log('Upload file for Pic ' + req.params.picID + ' and ' + req.params.userId, 'verbose');

    Pics.findById(req.params.picID, function(err, pic){
      if(err){ 
        return next(err);
      } else {     
        if(req.files && req.files.length){

          var file = {
            description : req.body.description,
            filename : req.files[0].filename,
            originalName : req.files[0].originalname,
            dateUploaded : new Date()
          };

          if (req.body.filename && req.body.filename != ''){
            for(var x = 0, z = pic.files.length; x < z; x++) {
              if (pic.files[x].filename == req.body.filename){
                pic.files[x] = file;
                break;
              }
            }
          } else {
            pic.files.push(file);
          }
        } else {
          if (req.body.filename && req.body.filename != ''){
            for(var x = 0, z = pic.files.length; x < z; x++) {
              if (pic.files[x].filename == req.body.filename){
                pic.files[x].description = req.body.description;
                break;
              }
            }
          }
        }
        pic.save()
        .then(pic => {
          res.status(200).json(pic);
        })
        .catch(error => {
          return next(error);
        });
      }
    });
   });

  router.get('/pics/user/:userID', function (req, res, next){
    logger.log('Get all pics', 'verbose');
    
    var query = Pics.find({userID:req.params.userID})
    .sort(req.query.order)
    .exec()
    .then(result => {
      if(result) {
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


  router.post('/pics/:picID/images', function(req, res, next){

    Pics.findById(req.params.picID, function(err,pic){
      if(err){ 
        return next(err);
      } else { 
        for(var i = 0, l = req.body.images.length; i < l; i++ ){
          for(var x = 0, z = pic.files.length; x < z; x++) {
            if (pic.files[x].filename == req.body.images[i]){
              pic.files.splice(x,1);
              break;
            }
          }
        }
        pic.save()
        res.status(200).json(pic);
      }
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





