'use strict';
const dispatcher = thorin.dispatcher;

dispatcher
  .addAction('home.login')
  .alias('GET', '/login')
  .use((intentObj, next) => {
    if(intentObj.session.account) {
      return intentObj.redirect('/account');
    }
    next();
  })
  .render('login.swig');

dispatcher
  .addAction('home.account')
  .alias('GET', '/account')
  .authorization('session.account')
  .input({
    text: dispatcher.validate('IP').default('127.0.0.1')
  })
  .use((intentObj, next) => {
    if(!intentObj.session.account) {
      return intentObj.redirect('/login');
    }
    intentObj.result('title', 'my title');
    next();
  })
  .render('account.swig');


dispatcher
  .addAction('home.landing')
  .alias('GET', '/')
  .authorization('token.auth')
  .use('todo.logger')
  .use((intentObj, next) => {
    console.log("M!");
    intentObj.result('KEY1', 'VALUE1');
    next();
  })
  .use((intentObj, next) => {
    log.info("HELLO WORLD");
    const result = {
      hello: 'world'
    };
    intentObj.result('KEY2', 'VALUE2');
    next();
  });