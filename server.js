const express = require('express');
const app = express();
const path = require('path');

// Constante da porta
const door = 5000;

const dados = require('./dados.json');

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


// Rota Hello World
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// ROTA GET -> /users
// Essa rota é responsável por exibir todos os users
app.get('/users',(req, res)=>{
    res.send(dados);
});

// ROTA GET -> /users/<id>
// Essa rota é responsável por exibir o user com base no id
app.get('/users/:id',(req, res)=>{
    const {id} = req.params;
    const user = dados.Usuario[id];
    if(user){
        res.send(user);
    }
    else{
        res.send("Usuário não encontrado!");
    }
});


// ROTA POST -> /users
// Essa rota é responsável por adicionar um novo user
app.post('/users', (req, res) => {
    const user = req.body;
    dados.Usuario.push({ ...user});
    console.log(user);
    res.json(dados);
});

// ROTA PATCH -> /users/<id>
// Essa rota é responsável por atualizar dados de um user com base no id
app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const novosDados = req.body;

    if (dados.Usuario[id]) {
        dados.Usuario[id] = { ...dados.Usuario[id], ...novosDados };
        res.send("Dados do usuário atualizados com sucesso!");
    } else {
        res.send("Usuário não encontrado!");
    }
});
    
// ROTA DELETE -> /users/<id>
// Essa rota é responsável por deletar um user com base no id
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    
    if (dados.Usuario[id]) {
        dados.Usuario.splice(id, 1);
        res.send("Usuário excluído com sucesso!");
    } else {
        res.send("Usuário não encontrado!");
    }
});

app.use('*', (req, res) => {
    res.send("Ocorreu um erro.");
})

app.listen(door, () => {
    console.log(`Server running on ${door} door.`);
})