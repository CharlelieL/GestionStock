const good = require('../models/goodModel');
const passport = require('passport');


class goodController{

showALL(request, response){
    
        const goods= good.findAll()
        response.render('dashboard',{goods})
    

}
}
module.exports = new goodController()