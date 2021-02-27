

 module.exports = (req, res, next) => {
    res.header (
        "Acces-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
};