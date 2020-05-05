// módulo file system do node
const fs = require('fs')
const data = require('./data.json')
const {age, date} = require('./utils')
const Intl = require('intl')

// show
exports.show = function(req, res){
    // req.query.id = ?id=1 (pela url)
    // req.body (corpo da requisição do formulário)
    // req.params.id = /:id (diretamente pela url: /instructors/1)
    const {id} = req.params // desestruturação do params, retirando o id dele

    // procurar o instrutor
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id // vai retornar true se achar
    })

    if (!foundInstructor) return res.send('Instructor not found!')
    
    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
        // O método vem com "." após o objeto e, se ele retornar outro objeto 
        // então pode ter métodos também, como ocorreu acima.
    }

    return res.render('instructors/show', { instructor: instructor })
}

// create (post)
exports.post = function(req, res){

    // VALIDAÇÃO

    // constructor Object é uma função que cria um objeto
    const keys = Object.keys(req.body)
        
    // body: pega todos os valores em formato de objeto
    // {"avatar_url":"http://www.google.com","name":"John Google","birth":"2020-02-02","gender":"M","services":"Yoga, Spinning, Cross-fit"}

    // keys: cria um array com as chaves do objeto body
    // ["avatar_url","name","birth","gender","services"]

    for (key of keys){
        if (req.body[key] == "") {
        // o mesmo de req.body.key == ""
            return res.send('Please fill in all the fields.')
        }
    }

    // Desestruturação do objeto body = variaveis disponibilizadas:
    let {avatar_url, birth, name, services, gender} = req.body

    
    // TRATAMENTO


    // Parse é um Método do date que transforma uma string em milisegundos
    birth = Date.parse(birth)

    // funcionalidade "desde" usando o constructor Date
    const created_at = Date.now()

    // Adicionando o ID com o constructor Number (criando um objeto numérico)
    const id = Number(data.instructors.length + 1)


    // ORGANIZAÇÃO

    // Array vazio + push = adicionar o req body, na proxima requisição adiciona outra entrada e assim por diante
    data.instructors.push({
        id,
        avatar_url,
        name,
        gender,
        services,
        birth,
        created_at,
    })

    // A callback function serve para nao bloquear o aplicativo em caso de alguma falha de escrita de dado
    // O aplicativo continua rodando normal e a callback function roda assim que algum bloco finalizar
    // Ou seja, a callback function possui duas características:
    // 1 - Executar depois de um certo tempo
    // 2 - Ser passada como parâmetro ou argumento de outra função, neste caso a writeFile
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write file error!')

        return res.redirect('/instructors')
    })

    // return res.send(req.body)
}

// edit
exports.edit = function(req, res) {
    const {id} = req.params // remova a variável id de params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send('Instructor not found!')
    
    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }
    
    return res.render('instructors/edit', { instructor })
}
    
// put (update)
exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if (id == instructor.id){
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send('Instructor not found!')

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.instructors[index] = instructor

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Error on writing the file!')
        
        return res.redirect(`/instructors/${id}`)
    })

}

// delete
exports.delete = function(req, res){
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('File write error!')

        return res.redirect('/instructors')
    })

}