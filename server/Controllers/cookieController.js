cookieController = {};

cookieController.setSSIDCookie =(req, res, next) => {
    const userID = res.locals.userInfo.userID;
    res.cookie('ssid', userID, {httpOnly:true});
    return next()
}

module.exports = cookieController;