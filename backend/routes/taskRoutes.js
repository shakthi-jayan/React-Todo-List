import express from 'express'
import { addTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/taskController.js'

const router = express.Router()

router.get('/', getTasks)
router.get('/:id', getTask)
router.post('/add', addTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router