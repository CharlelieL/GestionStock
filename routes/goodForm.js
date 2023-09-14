const express = require('express');

const router = express.Router();



router.get('/good/new', (req, res) => {

  if (req.isAuthenticated()) {
    res.render('goodForm',{
        title:"Nouveau bien",
        action:'/good/new',
        label:'',
        quantity:'',
        priceHT:''
    })
  } else {
    res.redirect('/login');
  }
});

module.exports = router;