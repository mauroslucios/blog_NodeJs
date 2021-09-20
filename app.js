//Carregando módulos
    const express = require("express")
    const handlebars = require("express-handlebars")
    const bodyParser = require("body-parser")
    const app = express();
    const admin = require("./routes/admin")
    const path = require("path")
    const db = require("./database/connection")
    const session = require("express-session")
    const flash = require("connect-flash")

    //const mongoose = require('./database/connection')
//Configurações
    //Sessão
        app.use(session({
            secret: "mlpsilv@30111969ec031103",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //Middlaware
        app.use((req, res, next)=>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine("handlebars", handlebars({defaultLayout: "main"}))
        app.set("view engine", "handlebars")
    //Mongoose

    //Public static
        app.use(express.static(path.join(__dirname,"public")))

    
//Rotas
    app.get('/',(req,res)=>{
        res.send("Rota principal")
    })
    app.use('/admin', admin)
//Outros
const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Running on url: http://localhost:${PORT}`);
})