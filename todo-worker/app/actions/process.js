'use strict';
/**
 * Sends a mail using the given template and arguments,
 * from one of the internal nodes.
 *
 * */
const dispatcher = thorin.dispatcher,
  mailObj = thorin.plugin('mail');

dispatcher
  .addAction('process.todo')
  .authorization('discovery#proxy')
  .use((intentObj, next) => {
    let todoData = intentObj.rawInput;
    log.info('TODO TO BE PROCESSED:', todoData);
    next();
  });
