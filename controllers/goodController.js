const session = require('express-session');
const sequelize = require('../configs/dbConfig');
const good = require('../models/goodModel');
const passport = require('passport');
const { RedisClient } = require('redis');
const Company = require('../models/companyModel');


class goodController{

async showALL(request, response){
        
        const companyId = request.session.passport.user
        // console.log(companyId)
        const goods= await good.findAll({ where: { companyId: companyId } })
        // const company = await Company.findAll({ where: { id: companyId } })
        const company = await Company.findByPk(companyId)
        // console.log(goods)
        // console.log(company)
        const logo = company.dataValues.logo;

        response.render('dashboard',{goods,logo})
    

}
}
module.exports = new goodController()