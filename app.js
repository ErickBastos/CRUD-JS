// Importação de dependências
const express = require("express")
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")

// Instância do aplicativo Express
const app = express()

// Configuração do mecanismo de view do Express
app.engine("handlebars", handlebars({defaultLayout: "main"}))

// Declaração de utilização do mecânismo configurado acima (handlebars)
app.set("view engine", "handlebars")

// Configuração do Express -> bodyParser (Processa dados codificados em URL)
app.use(bodyParser.urlencoded({extended: false}))
// extended: false -> é declarado como false para o body-parser aceitar apenas objetos e arrays como valores...

// Configura o bodyParser pra processar os dados em JSON
app.use(bodyParser.json())

// Importação de outros arquivos
const post = require("./models/post")


// CONFIGURAÇÃO DE ROTAS

    // Rota principal
        app.get("/", function(req, res){
            res.render("index")
        })

            // Rota para consultar registros
            app.get("/consulta", function(req, res){
                post.findAll().then(function(post){
                    res.render("consulta", {post})
                }).catch(function(erro){
                    console.log("Erro ao carregar a página " + erro)
                })
            })

            // Rota para editar registros
            app.get("/editar/:id", function(req, res){
                post.findAll({where: {'id': req.params.id}}).then(function(post){
                    res.render("editar", {post})
                }).catch(function(erro){
                    console.log("Erro ao carregar dados do banco: " + erro)
                })
            })
            

            // Rota para exclusão de registros (Ativável, no view)
            app.get("/excluir/:id", function(req, res){
                post.destroy(
                    {
                        where: {
                            'id': req.params.id
                        }
                    }
                ).then(function(){
                    res.render("index")
                }).catch(function(erro){
                    console.log("Erro ao excluir ou encontrar os dados do banco: " + erro)
                })
            })

            // Rota para cadastro
            app.post("/cadastrar", function(req, res){
                post.create({
                    nome: req.body.nome,
                    estoque: req.body.estoque,
                    status: req.body.status
                }).then(function(){
                    res.redirect("/")
                }).catch(function(erro){
                    res.send("Falha ao cadastrar os dados: " + erro)
                })
            })

            // Rota para atualizar (Ativável, no view)
            app.post("/atualizar", function(req, res){
                post.update({
                    nome: req.body.nome,
                    estoque: req.body.estoque,
                    status: req.body.status
                },{
                    where: {
                        id: req.body.id
                    }
                }).then(function(){
                    res.redirect("/consulta")
                })
            })

// Iniciador do servidor express
app.listen(8081, function(){
    console.log("Servidor ativo!")
})
