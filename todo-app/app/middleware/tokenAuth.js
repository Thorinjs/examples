'use strict';
const dispatcher = thorin.dispatcher;

const ADMIN_TOKEN = 'TOKEN123';// this should be placed somewhere else

dispatcher
  .addAuthorization('token.auth')
  .use((intentObj, next) => {
    const authToken = intentObj.authorization;
    if(!authToken) return next(thorin.error('NOT_AUTHORIZED', 'No auth token', 401));
    if(authToken !== ADMIN_TOKEN) {
      return next(thorin.error('INVALID_TOKEN', 'Invalid auth token', 401));
    }
    console.log(authToken);
    next();
  });