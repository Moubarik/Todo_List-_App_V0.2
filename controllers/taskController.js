 const Task = require('../models/taskModul')
const {getPostData} = require('../tools')

//  GETS ALL TASKS
// Route GET /api/taks

 async function getTasks(req, res) {
     try {
        const tasks = await Task.getAll()
        res.writeHead(200, {'Content-Type': 'appliction/json'})
        res.end(JSON.stringify(tasks))
     } catch (error) {
         console.log(error) 
     }
 }

//  GETS one TASKS
// Route GET /api/taks/:id

async function getTask(req, res, id) {
    try {
        const task = await Task.getById(id)
        if(!task) {
        res.writeHead(404, {'Content-Type': 'appliction/json'})
        res.end(JSON.stringify({ message : 'Task Not Found' }))
        } else {
        res.writeHead(200, {'Content-Type': 'appliction/json'})
        res.end(JSON.stringify(task))
        }
      
    } catch (error) {
        console.log(error)
    }
}

//  Gcreate a Task
// Route POST /api/tasks

async function createTask(req, res) {
    try {
       
      const body = await getPostData(req)
      const  {
        content,
    } = JSON.parse(body)
    const task = {
        content
    }
    const newTask = await Task.create(task)
    res.writeHead(201, {'Content-Type': 'application/json'})
    return res.end(JSON.stringify(newTask))



       
    } catch (error) {
        console.log(error)
    }
}

// Update a task
// Route PUT /api/tasks/:id
async function updateTask(req, res, id) {
    try {
        const task = await Task.getById(id)
        if(!task) {
            res.writeHead(404, {'Content-Type': 'appliction/json'})
            res.end(JSON.stringify({ message: 'Task Not Found' }))
        }else{

 
            const body = await getPostData(req)
            const  {content} = JSON.parse(body)
            const taskData = {
                         content:content|| task.content,
                         }
          const updTask = await Task.update(id, taskData)
          res.writeHead(200, {'Content-Type': 'application/json'})
          return res.end(JSON.stringify(updTask))
      
      
      
        }
      
       
    } catch (error) {
        console.log(error)
    }
}



//  Delete one TASKS
// Route GET /api/taks/:id

async function deleteTask(req, res, id) {
    try {
        const task = await Task.getById(id)
        if(!task) {
        res.writeHead(404, {'Content-Type': 'appliction/json'})
        res.end(JSON.stringify({ message : 'Task Not Found' }))
        } else {
            await Task.remove(id)
        res.writeHead(200, {'Content-Type': 'appliction/json'})
        res.end(JSON.stringify({ message: `Task ${id} removed`}))
        }
      
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask

} 