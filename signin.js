var express = require('express');
var router = express.Router();
var pool = require('./pool');
var multer = require('./multer');
require('dotenv').config()
var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('/scratch')
var jwt = require('jsonwebtoken')

function generateToken(adminname){
    return jwt.sign(adminname,process.env.TOKEN_SECRET,{expiresIn:'1000s'})
}
router.post('/addnewrecord',multer.any(),function(req,res,next) {
    pool.query("insert into userreg(name,emailid,password)values(?,?,?)",[req.body.name,req.body.emailid,req.body.password],function(err,result){
        if(err)
        {
            console.log(err)
            return res.status(500).json({RESULT:'false'})
        }
        else {
            console.log(result.affectedRows)
            if(result.affectedRows>=1)
    {
    return res.status(200).json({RESULT:'true'})
     }       
    else {
    return res.status(200).json({RESULT:'false'})
    }
 }

    })
});
router.post('/checklogin',function(req,res)
{ console.log(req.body)
pool.query("select * from userreg  where emailid=? and password=?",[req.body.emailid,req.body.password],function(err,result){
if(err){
  console.log(err)
 return res.status(500).json([])
}
else
{  
  if(result.length==1)
  {
  const token=generateToken({adminname:result[0].adminname})
     localStorage.setItem('token',token)
return res.status(200).json(result)
  }
  else
  {return res.status(200).json([])}  
}

})})
router.get('/logout',function(req,res){
    localStorage.removeItem('token')
    return res.status(200).json(true)
})

router.get('/chktoken',function(req,res){

 if(!localStorage.getItem('token'))
 {
return res.status(200).json(false)

 }
 else
 {
 return res.status(200).json(true)
 }

})
module.exports = router;