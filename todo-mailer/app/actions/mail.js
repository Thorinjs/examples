'use strict';
/**
 * Sends a mail using the given template and arguments,
 * from one of the internal nodes.
 *
 * */
const dispatcher = thorin.dispatcher,
  mailObj = thorin.plugin('mail');

dispatcher
  .addAction('mail.send')
  .authorization('discovery#proxy')
  .input({
    to: dispatcher.validate('EMAIL').error('INVALID_EMAIL', 'Invalid to e-mail address'),
    subject: dispatcher.validate('STRING').default(null),
    template: dispatcher.validate('STRING').error('INVALID_TEMPLATE', 'Missing template'),
    params: dispatcher.validate('JSON').default({})
  })
  .use((intentObj, next) => {
    let data = intentObj.input();
    mailObj
      .send({
        to: data.to,
        from: 'no-reply@mycompany.com',
        subject: data.subject,
        template: data.template
      }, data.params)
      .then(() => {
        log.info(`Sent e-mail [${data.template}] to [${data.to}]`);
        next();
      })
      .catch((e) => {
        log.warn(`Failed to send e-mail [${data.template}] to [${data.to}]`);
        log.debug(e);
        next(e);
      });
  });



/*
 * Render the template previewer
 * */
if (thorin.env === 'development') {
  dispatcher
    .addAction('email.template.preview')
    .alias('GET', '/mail/preview')
    .use('mail#preview');
}
