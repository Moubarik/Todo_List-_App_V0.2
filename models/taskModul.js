let tasks = require('../mydata/tasks')
const { v4: uuidv4 } = require('uuid')
const { writeDatatofile } = require('../tools')
function getAll() {

    return new Promise((resolve, reject) => {
        resolve(tasks)
    })
}

function getById(id) {

    return new Promise((resolve, reject) => {
        const task = tasks.find((t) => t.id === id)
        resolve(task)
    })
}


function create(task) {

    return new Promise((resolve, reject) => {
       const newTask = {id: uuidv4(), ...task}
        tasks.push( newTask)
        writeDatatofile('./mydata/tasks.json', tasks)
        resolve(newTask)
    })
}

function update(id, task) {

    return new Promise((resolve, reject) => {
      const index = tasks.findIndex((t) => t.id === id )
      tasks[index] = {id, ...task}
        writeDatatofile('./mydata/tasks.json', tasks)
        resolve(task[index])
    })
}

function remove(id) {

    return new Promise((resolve, reject) => {
      tasks = tasks.filter((t) => t.id !== id )
        writeDatatofile('./mydata/tasks.json', tasks)
        resolve()
    })
}



module.exports = {
    getAll,
    getById,
     create, 
     update,
     remove
}