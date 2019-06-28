const helpers = {};

helpers.isAuthenticated=(req,res,next)=>{
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg','No autorizado');
    res.render('/users/signin');
}

module.exports = helpers;