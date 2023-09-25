const express = require('express');
const sequelize = require('../configs/dbConfig');
const good =require('../models/goodModel');
const { NOW } = require('sequelize');
const router = express.Router();



router.get('/good/new', (req, res) => {

  if (req.isAuthenticated()) {
    res.render('goodForm',{
        titlePage:"Nouveau bien",
        action:'/good/new',
        label:'',
        quantity:'',
        priceHT:''
    })
  } else {
    res.redirect('/login');
  }
});


router.post('/good/new', async (req,res)=>{
  if (req.isAuthenticated()) {
    console.log(req.body.label)
    console.log(req.body.quantity)
    console.log(req.body.priceHT)
    const newGood= {
      label: req.body.label,
      quantity: parseInt(req.body.quantity),
      priceHT: parseInt(req.body.priceHT).toFixed(2),
    }
    try{
      
      await good.create(newGood)
      res.redirect('/dashboard')
    }catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la création du bon.');
    }

  }else{
    res.redirect('/login')
  }

})

router.get('/good/:id/edit',async (req,res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    const goodEdit = await good.findByPk(id)
    if (!goodEdit) {
      return res.status(404).send('Bien introuvable');
    }
    console.log(goodEdit)
    res.render('goodForm', {
      titlePage: "Modifier le bien",
      action: `/good/${id}/edit`, 
      label: goodEdit.label,
      quantity: goodEdit.quantity,
      priceHT: goodEdit.priceHT
    });
  } else {
    res.redirect('/login');
  }
})

router.post('/good/:id/edit', async (req,res) => {
  if (req.isAuthenticated()) {
    const id =req.params.id
    console.log(req.body)
    //{ label: 'bureau', quantity: '2', priceHT: '15' }
    const {label, quantity, priceHT} = req.body
    const updatedAt =NOW()

    const goodToUpdate = await good.findByPk(id);
    goodToUpdate.label =label
    goodToUpdate.quantity =quantity
    goodToUpdate.priceHT = priceHT
    goodToUpdate.updatedAt = updatedAt
    await goodToUpdate.save();
    res.redirect('/dashboard')
  }else{
    res.redirect('/login')
  }
})

router.get('/good/:id/delete', async (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;

    try {
      const goodToDelete = await good.findByPk(id);
      await goodToDelete.destroy();

      res.redirect('/dashboard');

    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la suppression du bien.');
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;