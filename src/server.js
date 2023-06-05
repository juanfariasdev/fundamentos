import http from 'node:http';


// GET, POST, PUT, PATCH, DELETE

// GET => get a information
// POST => Create a information in back-end
// PUT => Update a resource in back-end
// PATCH => Update a resource-specific information in the back-end
// DELETE => Delete a resource in back-end

// Stateful => They are only to save data in memory
// Stateless => Save data on external media


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