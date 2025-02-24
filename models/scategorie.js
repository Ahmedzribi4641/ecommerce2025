const mongoose = require("mongoose")
const Categorie =require("./categorie.js") // bech na3mlou biha pointeur 3al fichier categorie ya3ni bech nwaliw nod5lo b hetha
const scategorieSchema = mongoose.Schema({
    nomscategorie:{ type: String, required: true },
    imagescat :{ type: String, required: false },
    categorieID :{type:mongoose.Schema.Types.ObjectId,ref:Categorie}
})
module.exports=mongoose.model('scategorie',scategorieSchema)