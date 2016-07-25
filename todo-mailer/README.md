## 1. Installing dependencies
```
cd todo-mailer
npm install
```
## 2. Go to mailgun.com, validate an account and create a domain
## 3. Get your API key and place it under:
```javascript
// File: todo-mailer/config/env/development.js
"plugin.mail": {
    "options": {
        "auth": {
            "api_key": "YOUR_API_key"
        }
    }
}
```
*Note:*: in a production environment, use sconfig.io to store app credentials.

## 4. Boot up the application.
```javascript
node mailer.js
```