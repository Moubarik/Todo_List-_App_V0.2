const http = require('http')
const { getTasks, getTask, createTask, updateTask , deleteTask} = require('./controllers/taskController')
const server = http.createServer((req, res) => {
    if (req.url === '/api/tasks'  && req.method === 'GET'){
      getTasks(req, res)
        
    }else if(req.url.match(/\/api\/tasks\/([0-9]+)/) && req.method === 'GET') 
     {
        const id = req.url.split('/')[3]
        getTask(req, res, id)
    }else if(req.url === '/api/tasks'  && req.method ==='POST') {
        createTask(req, res)
    }else if(req.url.match(/\/api\/tasks\/([0-9]+)/) && req.method === 'PUT') 
    {
        const id = req.url.split('/')[3]
        updateTask(req, res, id)
    }
    else if(req.url.match(/\/api\/tasks\/([0-9]+)/) && req.method === 'DELETE') 
    {
        const id = req.url.split('/')[3]
        deleteTask(req, res, id)
    }
    
    
    
    else {
        res.writeHead(404, {'Content-Type': 'appliction/json'})
        res.end(JSON.stringify({message: 'route not found'}))
    }
    // console.log('welcome to 8008')
    // res.statusCode = 200
    // res.setHeader('Content-type', 'text/html')
    // res.write('<p>  Hello </p>')
    // res.end()
   
})
const PORT = process.env.PORT || 8008

server.listen(PORT,() => console.log(`Server running on port ${PORT}`))
