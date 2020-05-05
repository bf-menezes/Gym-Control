const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()


// O use é um middeware, criamos o servidor e colocamos ele online
// até colocar ele online, passamos por algumas configurações
// ele vai interceptar alguma coisa do ponto A ao ponto B 
// colocando algo no meio do caminho, função ou configuração.
// O segundo argumento da rota é o middleware, neste caso uma função
server.use(express.urlencoded({ extended: true })) // responsável por funcionar o req.body
server.use(express.static('public'))
server.use(methodOverride('_method')) //ele tem que vir antes das rotas pois ele primeiro sobreescreve o método e depois manda para rota
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function(){
    console.log('server is running')
})
