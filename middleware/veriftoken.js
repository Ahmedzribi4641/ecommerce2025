const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const header = req.headers['authorization'];
    const token = header && header.split('Bearer ')[1];
    
    if (!token) return res.status(403).send({ success: false, message: 'No token provided' });
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {               // decoded ma3neha bech ydecodi el token w yraj3elna meno les donner eli sna3nehom bih ya3ni ml les donneé hekom ne5o les attribut eli 7achti bihom mithel kima el role 5atel bech nesta3mlo fil middleware mte3 el role eli tji ba3d hethi fil methode donc hethi traja3li el user w ta3ml next bech tal9a ba3dha fil methode eli fil route el middleware mte3 el role eli bech testa3ml heka el user bech te5o el role ya3ni user.role
    
    if (err) return res.status(403).send({ success: false, message:'Invalid token' });
    req.user = {}         // ya3ni el bech ndecodiw el token w nesn3o meno user bech yraja3houlna bech nesta3mloh fil middleware eli ba3d ya3ni kima 9olna 9bal
    req.user.id = decoded.iduser
    req.user.role = decoded.role
    next()
    })
    }
    
    module.exports = { verifyToken }