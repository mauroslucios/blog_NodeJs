const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get('/',(req, res)=>{
    res.render("admin/index")
})

router.get('/posts', (req,res)=>{
    res.send("Página de posts")
})

router.get('/categorias', (req, res)=>{
    res.render("admin/categorias")
})

router.post("/categorias/nova", (req,res)=>{
    const novaCategoria ={
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categoria(novaCategoria).save().then(()=>{
        console.log("Categoria inserida com sucesso!")
    }).catch((err)=>{
        console.log("Houve um erro ao inserir a categoria!")
    })
})

router.get('/categorias/add',(req,res)=>{
    res.render("admin/addcategorias")
})
module.exports = router