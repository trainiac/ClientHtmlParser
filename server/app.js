import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import favicon from 'serve-favicon'
import logger from 'morgan'
import path from 'path'

import apiRoutes from './routes/api'
import getErrorHandlers from './routes/error'


export default (app, settings) => {

  const { config, loggerLevel } = settings
  const faviconFile = path.join(config.serveStaticPath, 'favicon.ico')

  console.log(`configuring favicon ${faviconFile}`)
  app.use(favicon(faviconFile))

  console.log(`configuring logger ${loggerLevel}`)
  app.use(logger(loggerLevel))

  console.log('configuring bodyParser')
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  )

  console.log('configuring cookieParser')
  app.use(cookieParser())

  console.log('configuring static routes')
  console.log(`config: build path ${config.clientBuildPath}`)
  console.log(`config: src path ${config.clientSrcPath}`)
  console.log(`config: public path ${config.staticPublicPath}`)
  app.use(
    config.staticPublicPath,
    express.static(config.clientBuildPath)
  )
  // the public path is defined in webpack.config.js

  const htmlFile = path.join(config.serveStaticPath, 'index.html')

  console.log(`configuring html wildcard route ${htmlFile}`)
  app.use((req, res) => {

    res.sendFile(htmlFile)

  })

  console.log('configuring api handlers')
  app.use('/api/', apiRoutes)

  console.log('configuring error handlers')
  app.use(getErrorHandlers(app))

  return app

}

