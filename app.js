const express= require('express')
const mongoose= require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const path = require('path'); // Ajout de l'importation de path
dotenv.config()
const app=express()

app.use(express.json())
app.use(cors())

const CategorieRouter=require("./routes/categorie.route")
const ScategorieRouter=require("./routes/scategorie.route")
const ArticleRouter=require("./routes/article.route")
const ChatBotRouter=require("./routes/chatbot.route")
const UserRouter=require("./routes/user.route")
const chatbotRequeteRouter = require("./routes/chatbot-requetes.route")
const PaymentRouter=require("./routes/payment.route")


// connexion a la base de donné
mongoose.connect(process.env.DATABASECLOUD)
.then(()=>{console.log("connexion a la base de donné reussie")})
.catch((error)=>{console.log("impossible de connecté a la base de donné",error)
    process.exit()
})




app.use("/api/categories",CategorieRouter)
app.use("/api/scategories",ScategorieRouter)
app.use("/api/articles",ArticleRouter)
app.use("/api/chat",ChatBotRouter)
app.use("/api/users",UserRouter)
app.use('/api/chatbot', chatbotRequeteRouter);
app.use('/api/payment', PaymentRouter);

// teba3 el hebergement mte3 el front 3melneh fil seance heki
app.use(express.static(path.join(__dirname, './client/build'))); // Route pourles pages non trouvées, redirige vers index.html
app.get('*', (req, res) => { res.sendFile(path.join(__dirname,'./client/build/index.html')); });
app.listen(process.env.PORT,()=>{
    console.log(`serveur is listen sur port ${process.env.PORT}`)
})


