import express from 'express'
import asyncHandler from 'express-async-handler'
import * as controller from '../controllers/myController.js'

const router = express.Router()

router.get('/', asyncHandler(controller.getStuff))
router.post('/', asyncHandler(controller.addStuff))
router.patch('/:id', asyncHandler(controller.updateStuff))
router.delete('/:id', asyncHandler(controller.deleteStuff))

export default router
