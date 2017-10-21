module.exports = {
    success: (req,res,location,message) => {
        res.locals.successMessage = message;
        res.render(location);
    },
    error: (req,res,location,message) => {
        res.locals.globalError = message;
        res.render(location);
    }
}