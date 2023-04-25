const logRequest = (req, res, next) => { //we can use multiple middleware and will run in sequence
    console.log("second check")
    next();//->if success continue to path request. 
}

module.exports = {
    logRequest
} //if exports using -> '{}' in order to import this method need to call the method name like middlewareLogsReq(->imported variable).logRequest(->method name)