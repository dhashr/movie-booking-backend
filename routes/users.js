var express = require('express');
var router = express.Router();
let user = require('../packages/schema')
let {hashpassword, hashcheck} = require('../packages/bcrypt')

/* GET users listing. */
router.get('/', async(req, res)=>{
  try{
    let getDetails = await user.find()
    res.send(getDetails)
  }
  catch(err){
    console.log(err);
  }
})
router.post('/signup', async (req, res)=>{
  try{
    let {email, mobile_no}=req.body
    let postDetails = await user.find({email:email}, {mobile_no:mobile_no})
    if(postDetails.length !==0){
      res.json({
        message:'Already exists account, please login'
      })
    }
    else{
      let hash = await hashpassword(req.body.password)
      req.body.password = hash
      let hash1 = await hashpassword(req.body.c_password)
      req.body.c_password = hash1
      let data = await new user(req.body)
      await data.save()
      res.json({
        message:'Data inserted'
      })
    }
  }
  catch(err){
    console.log(err);
  }
})
router.post('/login', async (req, res)=>{
  try{
    let {email} = req.body
    let  logindetail = await user.find({email:email})
    if(logindetail.length === 0){
      res.json({
        message:'No account exsist, please signup'
      })
    }
    else{
      let hashcompare = await hashcheck(req.body.password, logindetail[0].length)
      if(hashcompare){
        res.json({
          message:"login success"
        })
      }
      else{
        res.json({
          message:"wrong password"
        })
      }
    }
  }
  catch(err){
    console.log(err);
  }
})
module.exports = router;
