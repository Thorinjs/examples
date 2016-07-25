'use strict';
const dispatcher = thorin.dispatcher,
  store = thorin.store('sql'),
  authPlugin = thorin.plugin('auth-password'),
  discoveryObj = thorin.plugin('discovery');

dispatcher
  .addAction('account.register')
  .input({
    email: dispatcher.validate('EMAIL'),
    first_name: dispatcher.validate('STRING'),
    last_name: dispatcher.validate('STRING'),
    password: dispatcher.validate('STRING')
  })
  .use((intentObj, next) => {
    const accountData = intentObj.input(),
      Account = store.model('account');
    let calls = [],
      accountObj;

    let pErr = authPlugin.checkPolicy(accountData.password);
    if (pErr) {
      return next(pErr);
    }

    calls.push(() => {
      return authPlugin.hashPassword(accountData.password).then((hashed) => {
        accountData.password = hashed;
      });
    });

    calls.push((stop) => {
      return Account.find({
        where: {
          email: accountData.email
        }
      }).then((accObj) => {
        if (accObj) {
          return stop(thorin.error('ACCOUNT.EXISTS'));
        }
      });
    });

    calls.push(() => {
      accountObj = Account.build(accountData);
      return accountObj.save();
    });

    calls.push(() => {
      return discoveryObj.dispatch('mailer', 'mail.send', {
        to: accountObj.email,
        subject: 'Welcome aboard!',
        template: 'welcome.swig',
        params: accountObj.toJSON()
      }).then(() => {
        log.info("Sent out e-mail");
      }).catch((e) => {
        log.warn(`Could not send register e-mail`);
      });
    });

    thorin.series(calls, (e) => {
      if (e) return next(e);
      intentObj.session.account = accountObj.toJSON();
      next();
    });
  });

dispatcher
  .addAction('account.login')
  /*  .use((intentObj, next) => {
   if (intentObj.session.account) {
   return next(thorin.error('LOGGEDIN', 'Already logged in.'))
   }
   next();
   })*/
  .authorize('auth#password.login')
  .use((intentObj, next) => {
    const accountObj = intentObj.data('account');
    console.log("THIS IS MY SESSION", intentObj.session);
    if (!intentObj.session.account) {
      intentObj.session.account = accountObj.toJSON();
    }
    intentObj.result(accountObj);
    //console.log("OK", accountObj);
    next();
  });

dispatcher
  .addAction('account.logout')
  .alias('GET', '/logout')
  .use((intentObj, next) => {
    if (intentObj.session.account) {
      intentObj.session.destroy();
    }
    next();
  });