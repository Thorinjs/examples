'use strict';
module.exports = {
  "cdn": "http://localhost:3001",
  "transport.http.port": 3001,
  "plugin.mail": {
    "transport": "mailgun",
    enabled: false,
    admin: "admin@yoursite.com",
    options: {
      auth: {
        api_key: ""
      }
    }
  }
};