'use strict';
/**
 * Created by Adrian on 12-Apr-16.
 */
const thorin = require('thorin');

process.env.SCONFIG_KEY = '{YOUR_SCONFIG_KEY}';

thorin
  .addTransport(require('thorin-transport-http'))
  .addPlugin(require('thorin-plugin-mail'))
  .addPlugin(require('thorin-plugin-render'))
  .addPlugin(require('thorin-plugin-discovery'));

thorin.addConfig('sconfig');

thorin.run((err) => {
  log.info('Thorin app: ' + thorin.id);
});