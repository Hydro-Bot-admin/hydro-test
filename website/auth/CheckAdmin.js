const devs = ["640019375776071680","700656817344086078"]
module.exports = async (req, res, next) => {
    if(req.isAuthenticated() && req.user.id == devs ) return next(); 
     else {
     	    res.redirect('/')
     }
    
};
