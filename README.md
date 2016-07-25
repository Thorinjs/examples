### Thorin.js example applications

#### Short description:
The 3 applications work as microservices part of the larger todo app. In order for them to discover themselves, we use
the discovery system as well as the application configuration storage from https://sconfig.io .

Each microservice will have a `process.env.SCONFIG_KEY` variable placed in their root js file. Change it with your
application key, once you've created one on sconfig.io
*Note*: Be sure to check ***use sconfig discovery*** when creating the application on sconfig.io

For more information about SConfig, see https://github.com/UNLOQIO/sconfig-node-client

#### Todo-app as the API +  view engine

`todo-app/`

#### Todo-mailer, the mailer microservice of our todo application

`todo-mailer/`

#### Todo-worker, the worker microservice of our todo application

`todo-worker/`