## Dependencies

### Client Libraries

These are all of the minimum required libraries that are required for react redux client side application.

* [aphrodite](https://github.com/Khan/aphrodite) - Allows for writing inline styles via js.
* [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) - This will emulate a full ES2015 environment.
* [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) - Make node like network request form the browser.
* [jquery](http://jquery.com) - DOM manipulation and traversal toolbelt. Remember to only import slim version `import 'jquery/dist/jquery.slim'`
* [lodash](https://lodash.com/) - Utility functions for manipulating data structures.
* [normalizr](https://github.com/paularmstrong/normalizr) - Normalizes deeply nested JSON API responses according to a schema for Flux and Redux apps.
* [react](https://facebook.github.io/react/) - Client side rendering framework.
* [react-dom](https://www.npmjs.com/package/react-dom) - This package serves as the entry point of the DOM-related rendering paths.
* [react-redux](http://redux.js.org/docs/basics/UsageWithReact.html) - Helpers for using redux with React.
* [react-router](https://github.com/ReactTraining/react-router) - A routing library for React.
* [react-router-redux](https://github.com/reactjs/react-router-redux) - Helpers for syncing React, Redux, and React Router.
* [redux](http://redux.js.org/) - Redux is a predictable state container.
* [redux-thunk](https://github.com/gaearon/redux-thunk#motivation) Redux Thunk middleware allows you to write action creators that return a function instead of an action.

Note: unlike the rest of the client side application
      dependency tree, `babel-polyfill` is added
      in the entry point of `webpack.config.js`

### Client Devtools

All of these client side libraries are using during development but not packaged up for deployment.

* [react-hot-loader](https://github.com/gaearon/react-hot-loader) - Hot module loader for react components
* [redux-devtools](https://github.com/gaearon/redux-devtools) - A live-editing time travel environment for Redux.
* [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) - A resizable and movable dock for Redux DevTools.
* [redux-devtools-log-monitor](https://github.com/gaearon/redux-devtools-log-monitor) - The default monitor for Redux DevTools with a tree view.
It shows a log of states and actions, and lets you change their history.
* [redux-logger](http://evgenyrodionov.github.io/redux-logger/) - Logger middleware for Redux

Note: elements of `react-hot-loder` are required
      for both babel (.babelrc) and webpack
      (webpack.dev.config.js entry point)

### Server libraries

These are all of the minimum required libraries that are required for an express server application.

* [body-parser](https://github.com/expressjs/body-parser) Body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
* [cookie-parser](https://github.com/expressjs/cookie-parser) - Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
* [debug](https://www.npmjs.com/package/debug) - Debugging utility for logging debug information.
* [express](https://expressjs.com/) - Web framework
* [express-jsonschema](https://www.npmjs.com/package/express-jsonschema) - Jsonschema validation middleware
* [http-status-codes](https://www.npmjs.com/package/http-status-codes) - Constants enumerating the HTTP status codes.
* [lodash](https://lodash.com/) - Utility functions for manipulating data structures.
* [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware.
* [node-fetch](https://www.npmjs.com/package/node-fetch) - A light-weight module that brings window.fetch to Node.
* [serve-favicon](https://github.com/expressjs/serve-favicon) - Middleware for serving a favicon.

### Babel

All server and client application code as well as test code require babel transpilation.

* [babel-cli](http://babeljs.io/docs/usage/cli/) - Babel command line, useful for webpack
* [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core) - Babel compiler, required by all babel libraries.
* [babel-jest](https://github.com/facebook/jest/tree/master/packages/babel-jest) - Allows you to write and run jest test code in es2015.
* [babel-eslint](https://github.com/babel/babel-eslint) - Allows you to lint all valid Babel code with the ESLint. Referenced in `.eslintrc` parser field.
* [babel-loader](https://github.com/babel/babel-loader) - Webpack plugin for Babel. Refenced in `webpack.config.js` js module loaders.
* [babel-plugin-transform-object-rest-spread](https://babeljs.io/docs/plugins/transform-object-rest-spread/) - This plugin allows Babel to transform rest properties for object destructuring assignment and spread properties for object literals.
* [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) - Babel preset for all es2015 plugins
* [babel-preset-es2015-node5](https://www.npmjs.com/package/babel-preset-es2015-node5) - Adds only es2015 features that node is missing
* [babel-preset-react](https://www.npmjs.com/package/babel-preset-react) - Babel preset for all React plugins

Note: All Babel plugins and presets are referenced in `.babelrc`

### Webpack

Webpack handles all off the client side script bundling, invoking babel to transpile js code, inlines css into the html file, and moves images and other static assets to the app build for production.

* [copy-webpack-plugin](https://webpack.github.io/) - A webpack plugin for simply copying files to a new directory while a module is being built.
* [css-loader](https://webpack.github.io/) - A webpack plugin for bundling raw css files.
* [extract-text-webpack-plugin](https://webpack.github.io/) - A module for writing text files to disk. Used with `css-loader`
* [webpack](https://webpack.github.io/) - A module bundler.
* [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) - Compiles js files during development
* [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) - Enable hot module reloading

**Linting**
* [eslint](http://eslint.org/) - Validates js and enforces code integrity. Requires an `.eslintrc` and `.eslintignore` file.
* [eslint-plugin-react](https://github.com/babel/babel-eslint) - React specific linting rules for ESLint. Referenced in the `.eslintrc` file

### Tests
* [jest](https://facebook.github.io/jest/) - Used for server and client testing and code coverage

