import express from 'express'
import { addTask, getTasks } from '../controllers/taskController.js'
const router = express.Router()
router.get('/',getTasks)
router.post('/add',addTask)
export default router