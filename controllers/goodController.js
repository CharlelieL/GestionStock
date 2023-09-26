const session = require('express-session');
const sequelize = require('../configs/dbConfig');
const good = require('../models/goodModel');
const passport = require('passport');
const { RedisClient } = require('redis');


class goodController{

async showALL(request, response){
        
        const companyId = request.session.passport.user
        console.log(companyId)
        const goods= await good.findAll({ where: { companyId: companyId } })
        console.log(goods)
        response.render('dashboard',{goods})
    

}
}
module.exports = new goodController()