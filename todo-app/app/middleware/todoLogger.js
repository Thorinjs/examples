'use strict';
const dispatcher = thorin.dispatcher;

dispatcher
  .addMiddleware('todo.logger')
  .input({
    name: dispatcher.validate('STRING').error('INVALID_NAME', 'Name is required', 400)
  })
  .use((intentObj, next) => {
    let inputData = intentObj.input();
    log.info(intentObj.action + ' JUST HAPPEND by ' + inputData.name);
    next();
  });