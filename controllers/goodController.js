const sequelize = require('../configs/dbConfig');
const good = require('../models/goodModel');
const passport = require('passport');


class goodController{

async showALL(request, response){
    
        const goods= await good.findAll()
        console.log(goods)
        response.render('dashboard',{goods})
    

}
}
module.exports = new goodController()