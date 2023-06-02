import http from 'node:http';


// GET, POST, PUT, PATCH, DELETE

// GET => Buscar uma informação
// POST => Criar uma Informação no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação uma e especifica de um recurso no back-end
// DELETE => Deleta um recurso do back-end

// Stateful => Somente guarda dados em memória
// Stateless => Guarda dados em meios externos

// Cabeçalhos (Requisição/resposta) => Metadados

const users = []

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/users') {
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users));
    }
    if(method === 'POST' && url === '/users'){
        const user = {
            name: 'Juan',
            age: 20,
            email:'juan@g.com'
        }
        users.push(user)
        return res.writeHead(201).end()
    }

    return res.writeHead(404).end();
});

server.listen(3333);