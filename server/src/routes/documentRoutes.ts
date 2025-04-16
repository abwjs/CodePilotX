import express from 'express'
import {createDocument} from '../controller/documentController'
const router = express.Router()
router.post('/document/create',createDocument)
export default router