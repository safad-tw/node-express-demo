function log(req,res,next){
    console.log("authenticate")
    next()
}

module.exports = log;