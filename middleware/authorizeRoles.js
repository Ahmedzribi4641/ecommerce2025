const authorizeRoles = (...roles) => {
    return (req, res, next) => {
    if(!roles.includes(req.user.role)) { // normalement el user hna bech ye5tho ml token ya3ni wala ml middleware verifyToken fibeli 5atro fil lo5r el middleware hetha yraja3 user ka objet w fih el role wel id
    return res.status(401).send({ success: false, message: 'non autorisé' });
    }
    next()
    }
    }
    module.exports = { authorizeRoles }