const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
email: {type: String,required: true,unique: true},
password: {type: String,required: true,},
firstname: {type: String,required: true,},
lastname: {type: String,required: true,},
role: {type: String,enum: ["user", "admin"],default: "user"},
isActive: {type: Boolean,default: false,required: false},
avatar :{type: String,required: false},
},
{
timestamps: true,
},
)


// middleware el bech ye5dem 9bal (.pre) kol save  ya3ni siwe2 post wala put bech ya3meli el cryptage mte3 el passeword bech yrodo crypté ya3ni eli bech yetsajel fil base bech ykoun hashe mouch heka eli ktebto enti ya3ni
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next() // t9oul 3liya 9otlo rani 8alet kamel 3ala rou7k w e3taberni ma9otlk chyn 5ater el password matbadelch
    //ya3ni itha saret el modification 3al attribut password taw 5ater itha masaretch bech y5arrjo bil if elli 9bal hethi howa (modification no9sdo biha wa9t ay save() tsir 3al table fil fichier route ya3ni) 
    // (5ater a7na 3andna fil fichier route save o5ra eli hiya wa9t nbadel el isActive donc lezem na3tih el if eli 9bal hethi bech n9olo fil 7ala heki ya3ni wa9t el password mayetbadelch mat3awedch ta3ml el hashage lel passeword)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
    })

    // el (this) betbi3a tarja3 3al user eli na3ml bih el methode user.save() 5ater el middle ware hetha bech ye5dem ba3d ay save donc el user bech ykoun ya3rfo mrigl


module.exports = mongoose.model('User', userSchema)