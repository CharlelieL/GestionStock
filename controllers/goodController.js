const good = require('../models/goodModel');
const passport = require('passport');
class goodController{

showALL(response,request){
    if (request.isAthentificated()) {
        const goods= good.findAll()
        response.render('goods',{goods})
    }else{
        response.redirect('/')
    }

}
}