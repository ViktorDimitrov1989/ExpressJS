module.exports = {
    redirectAndNotify: (req,res,redirectPath,message) => {
        res.locals.globalError = message;
        res.render(redirectPath);
    }
}