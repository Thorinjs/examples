'use strict';
const dispatcher = thorin.dispatcher,
  store = thorin.store('sql');

dispatcher
  .addAuthorization('session.account')
  .use((intentObj, next) => {
    if(!intentObj.session.account) {
      return intentObj.redirect('/login');
    }
    const Account = store.model('account');
    Account.find({
      where: {
        id: intentObj.session.account.id
      }
    }).then((accountObj) => {
      if(!accountObj) {
        intentObj.session.destroy();
        return intentObj.redirect('/login');
      }
      intentObj.data('account', accountObj);
      next();
    }).catch(next);
  });