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
    Categoria.find().sort({date:'desc'}).lean().then((categorias)=>{
        res.render("admin/categorias", {categorias: categorias})
    }).catch((err)=>{
        req.flash("error_msg","Houve um erro ao listar as categorias")
        res.redirect("/admin")
        console.log("Erro ao listar categorias: "+ err)
    })
    
})

router.post("/categorias/nova", (req,res)=>{

    //Validação manual
    let erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido!"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido"})
    }

    if(req.body.nome.length < 2){
        erros.push({texto: "Tamanho deverá ser maior que 2 caracteres"})
    }

    if(req.body.slug.length < 2){
        erros.push({texto: "Tamanho deverá ser maior que 2 caracteres"})
    }

    if(erros.length > 0){
        res.render("admin/addcategorias",{erros: erros})
    }else{

        const novaCategoria ={
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(()=>{
            req.flash("success_msg","Categoria criada com sucesso.")
            res.redirect("/admin/categorias")
        }).catch((err)=>{
            req.flash("error_msg","Houve um erro ao inserir a categoria!")
            res.redirect("/admin")
        })  
    }
})

router.get("/categorias/edit/:id",(req,res)=>{
    res.send("Página de edição de categoria")
})
router.get('/categorias/add',(req,res)=>{
    res.render("admin/addcategorias")
})
module.exports = router