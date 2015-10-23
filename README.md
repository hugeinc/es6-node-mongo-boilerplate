# Webpack/ES6 - Node/Express - MongoDB
Boilerplate: [ES6 Front End](http://es6-features.org/) utilizing [Webpack](http://webpack.github.io/docs/), [Sass](http://sass-lang.com/) (with [Bourbon](http://bourbon.io/) and [Neat](http://neat.bourbon.io/)), [Gulp](http://gulpjs.com/), [Karma/Jasmine](https://www.npmjs.com/package/karma-jasmine)/[Jasmine jQuery](https://github.com/bessdsv/karma-jasmine-jquery), [Node.js](https://nodejs.org/en/), [Express](http://expressjs.com/), [express-vhost](https://www.npmjs.com/package/express-vhost), [MongoDB](https://www.mongodb.org/)

_by Jayson Jacobs_

### Installation

`npm install -g gulp`

`npm install -g karma-cli`

`npm install -g webpack`

`npm i`

`gem install neat`

`gem install sass`

`gem install bourbon`

`bourbon install`

`neat install`

(you might need to use sudo for some of the above commands)

### Usage

use `forever` or `nodemon` to run node.js.

installation:
`npm install -g forever` or
`npm install -g nodemon`

to run MongoDB:
`mongod --config=db/mongo.conf`

to run the server:
`nodemon index.js` will keep an open task (good for development) or
`forever start index.js` will spawn a daemon (good for production)

to stop the server:
`ctrl+c` if using nodemon or
`forever stop index.js` (use sudo if you used it to start forever)

run task `gulp` for development compilation.

run task `karma start` for testing.

default url: http://localhost:8001

### virtual hosts

Look in /index.js for vhost configuration.

You'll need to add new tasks in gulpfile.js for front-end compilation

i.e.
`dynamicTasks('virtualdomain');`

make sure you have local virtual domains forwarded to 127.0.0.1 for development.

i.e.

127.0.0.1	virtualdomain.local

127.0.0.1	virtualdomainalt.local


in /etc/hosts

## Production info
To run on a remote server, use the following task.

`sudo NODE_ENV=prod forever start index.js`

`NODE_ENV=prod` tells the application to run on port 80.
