import express from 'express'
// import * as Objects from '../../facades/Objects'


const objectRoutes = express.Router({
  mergeParams: true
})

objectRoutes.get('/action/', (request, response) => {

  response.json({})

})

export default objectRoutes


