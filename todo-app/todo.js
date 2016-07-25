'use strict';
const thorin = require('thorin');

process.env.SCONFIG_KEY = '{YOUR_SCONFIG_TOKEN}';

thorin
  .addTransport(require('thorin-transport-http'))
  .addStore(require('thorin-store-sql'))
  .addPlugin(require('thorin-plugin-auth-password'))
  .addPlugin(require('thorin-plugin-session'))
  .addPlugin(require('thorin-plugin-render'))
  .addPlugin(require('thorin-plugin-discovery'));
//.addPlugin(require('thorin-plugin-loglet'));

thorin.addConfig('sconfig');


thorin.run((err) => {
  if (err) return;
  log.info("Running");
});