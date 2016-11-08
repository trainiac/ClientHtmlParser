// Definition for all api routes. Route handlers are defined in separate files.

import objectRoutes from './api/objects'
import express from 'express'

const apiRoutes = express.Router()

apiRoutes.use('/objects/', objectRoutes)

export default apiRoutes
