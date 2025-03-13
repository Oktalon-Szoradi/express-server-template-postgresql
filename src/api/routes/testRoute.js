import express from 'express'
import asyncHandler from 'express-async-handler'
import * as controller from '../controllers/testController.js'

const router = express.Router()

router.get('/', asyncHandler(controller.getTest))

export default router
