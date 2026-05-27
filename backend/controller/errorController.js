//function to handle all errors
function handleError(err, req, res, next) {
    res.render('ErrorPage',{errorMessage: err.message})
    res.status(500)
}

module.exports = { 
    handleError
}