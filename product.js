var express = require('express');
var router = express.Router();
var pool = require('./pool');
var multer = require('./multer');


router.post('/addnewproduct',multer.any(),function(req,res,next) {
    if(!localStorage.getItem('token')) {
        return res.status(200).json('Session Expired Pls Login Again')
    }
    pool.query("insert into product(name,price,category,qty,image)values(?,?,?,?,?)",[req.body.name,req.body.price,req.body.category,req.body.qty,req.files[0].filename],function(err,result){
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
router.get('/displayall',function(req,res,next){
    console.log(req.body)
    if(!localStorage.getItem('vtoken'))
    { return  res.status(200).json('Session has Expired Please Login Again')}
   
    pool.query("select * from product",function(err,result){
      if(err){
        return  res.status(500).json([])
      }
      else{
        return  res.status(200).json(result)
      }
    })
  
  })
  router.post('/deleteRecord',function(req,res,next){
    if(!localStorage.getItem('vtoken'))
    { return  res.status(200).json('Session has Expired Please Login Again')}
   
    pool.query("delete from product where productid=?",[req.body.productid],function(err,result){
      if(err){
        return  res.status(500).json([])
      }
      else{
        return  res.status(200).json(result)
      }
    })
  
  })
  router.post('/updateproduct',multer.any(),function(req,res,next) {
    if(!localStorage.getItem('token')) {
        return res.status(200).json('Session Expired Pls Login Again')
    }
      console.log("data",req.body)
      console.log("Files",req.file)
        var a=''
        if(req.body.picture!="") {
       a="update product set name=?,price=?,category=?,qty=?,image=? where productid=?"
     p=[req.body.name,req.body.price,req.body.category,req.body.qty,req.files[0].filename,req.body.productid]
    }
    else {
        a="update product set name=?,price=?,category=?,qty=? where productid=?"
        p=[req.body.name,req.body.price,req.body.category,req.body.qty,req.body.productid]
      
    }
    pool.query(a,p,function(err,result){
        if(err){
            console.log(err)
            return res.status(500).json({RESULT:'false'})
        }
        else{console.log(result)
            return res.status(200).json({RESULT:'true'})
        }

    })
});
  
module.exports = router;