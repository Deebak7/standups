var express = require('express');
var router = express.Router();
module.exports.router=router;

const standupController=require('../controller/standups/standupController');
const listnerValidator=require('../routes/validators/listenerValidator/listenerValidator');
const validation=require('../middleware/validate-schema');
const path=require('path');



const passport=require('passport');
router.use(passport.initialize());

const publicDirectoryPath=path.join(__dirname, 'views');



router.get('/index',(req,res)=>{
  res.sendFile(path.join(publicDirectoryPath, 'index.html'));
})

router.get('/home', (req, res) => {
  res.render('home');
});


router.get('/signup',(req,res) => {
  res.render('signup');
})

router.get('/signin',(req,res) => {
  res.render('signin');
})


router.get('/homeicon',(req,res) => {
  res.render('homeicon');
})

router.post('/create',listnerValidator.listnerValidation.createListner,validation.validate,standupController.createListener);
router.get('/token',standupController.generateToken);
router.post('/exist',standupController.existListener);

// router.post('/exist',passport.authenticate('jwt',{session:false}),standupController.existListener);


router.get('/searchicon',(req,res) => {
  res.render('searchicon');
})

router.get('/discussion',(req,res) => {
  res.render('discussion');
})

router.get('/libraryicon',(req,res) => {
  res.render('libraryicon');
})

router.get('/podcasticon',(req,res) => {
  res.render('podcasticon');
})

router.get('/profile',(req,res) => {
  res.render('profile');
})

router.get('/standups',(req,res) => {
  res.render('discription');
})

router.get('/logo',(req,res)=>{
  res.render('logo');
})

router.get('/signup1',(req,res)=>{
  res.render('signup1');
})

router.get('/google',passport.authenticate('google',{scope:['profile','email','https://www.googleapis.com/auth/calendar'],accessType:'online'}))

router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/failure'}),
function(req,res){
  res.redirect('/success')
})

router.get('/facebook',passport.authenticate('facebook',{scope:'email'}))

router.get('/facebook/callback',passport.authenticate('facebook',{
  successRedirect:'/success',
  failureRedirect:'/failure'
}))

router.get('/success',(req,res)=>{ 
  res.render('success');
})

router.get('/failure',(req,res)=>{
  res.render('failure');
})










