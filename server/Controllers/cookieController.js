cookieController = {};

cookieController.setSSIDCookie =(req, res, next) => {
    const number = Math.floor(Math.random() * 100).toString(); 
    const cookie = res.cookie('ssid', number, {httpOnly:true});
    res.locals.token = number;
    return next()
}

module.exports = cookieController;