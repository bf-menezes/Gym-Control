const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

// Estamos usando um protocolo de transferência de dados de hypertext HTTP
// Ele possui verbos HTTP (regras de comunicação):
// GET: Receber Resource
// POST: Criar um novo Resource com dados enviados
// PUT: Atualizar um Resource
// DELETE: Deletar um Resource
// O Resource neste caso é o instrutor, pode ser também algo mais abstrato como autenticação

routes.get('/', function(req, res ){
    return res.redirect('/instructors')
})

routes.get('/instructors', instructors.index)

routes.get('/instructors/create', function(req, res){
    return res.render('instructors/create')
})

routes.get('/instructors/:id', instructors.show) // recebendo o id pela rota

routes.get('/instructors/:id/edit', instructors.edit)

routes.post("/instructors", instructors.post)

routes.put('/instructors', instructors.put)

routes.delete('/instructors', instructors.delete)

routes.get('/members', function(req, res){
    return res.send('members')
})

module.exports = routes

