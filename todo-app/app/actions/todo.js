'use strict';
const dispatcher = thorin.dispatcher,
  store = thorin.store('sql'),
  discoveryObj = thorin.plugin('discovery');

function alterAccountQuery(intentObj, query) {
  query.where.account_id = intentObj.session.account.id;
}

store
  .restify('todo', 'create')
  .authorization('session.account')
  .alias('POST', '/todos')
  .filter('create.before', (intentObj, todoObj) => {
    todoObj.set('account_id', intentObj.session.account.id);
  })
  .filter('create.after', (intentObj, todoObj) => {
    discoveryObj.dispatch('worker', 'process.todo', todoObj.toJSON()).then(() => {
      log.info('Todo queued to be processed');
    });
  });

store
  .restify('todo', 'find')
  .authorization('session.account')
  .alias('GET', '/todos')
  .filter('find.before', alterAccountQuery);

store
  .restify('todo', 'read')
  .authorization('session.account')
  .alias('GET', '/todos/:id')
  .filter('read.before', alterAccountQuery);

store
  .restify('todo', 'delete')
  .authorization('session.account')
  .filter('delete.before', alterAccountQuery);

store
  .restify('todo', 'update')
  .authorization('session.account')
  .alias('PUT', '/todos')
  .alias('POST', '/todos/:id')
  .filter('update.before', alterAccountQuery);


dispatcher
  .addAction('todo.create.raw')
  .input({
    name: dispatcher.validate('STRING'),
    text: dispatcher.validate('STRING'),
    is_done: dispatcher.validate('BOOL')
  })
  .authorization('session.account')
  .use((intentObj, next) => {
    const Todo = store.model('todo'),
      accountObj = intentObj.data('account');
    const calls = [];
    let todoObj;
    calls.push(() => {
      const inputData = intentObj.input();
      todoObj = Todo.build(inputData);
      todoObj.set('account_id', accountObj.id);
      return todoObj.save();
    });

    thorin.series(calls, (e) => {
      if (e) return next(e);
      intentObj.result(todoObj);
      next();
    });
  });