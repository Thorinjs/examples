var main =
  /******/ (function(modules) { // webpackBootstrap
  /******/ 	// The module cache
  /******/ 	var installedModules = {};

  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {

    /******/ 		// Check if module is in cache
    /******/ 		if(installedModules[moduleId])
    /******/ 			return installedModules[moduleId].exports;

    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
      /******/ 			exports: {},
      /******/ 			id: moduleId,
      /******/ 			loaded: false
      /******/ 		};

    /******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    /******/ 		// Flag the module as loaded
    /******/ 		module.loaded = true;

    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}


  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules;

  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules;

  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = "js/";

  /******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(0);
  /******/ })
/************************************************************************/
/******/ ([
  /* 0 */
  /***/ function(module, exports, __webpack_require__) {

    module.exports = __webpack_require__(1);


    /***/ },
  /* 1 */
  /***/ function(module, exports, __webpack_require__) {

    'use strict';

    var fetcher = __webpack_require__(2);

    window.fetcher = fetcher;

    /*tredux = require('tredux'),
     React = require('react'),
     ReactDOM = require('react-dom');
     /!* Define our API fetcher *!/
     fetcher('api', {
     credentials: true,
     url: 'http://localhost:3000/dispatch'
     });
     // require our reducers.
     require('reducers/index');
     const TodoApp = require('pages/TodoApp').default;
     ReactDOM.render(tredux.mount(<TodoApp />), document.getElementById('react-app'));
     */

    /***/ },
  /* 2 */
  /***/ function(module, exports, __webpack_require__) {

    module.exports = __webpack_require__(3);

    /***/ },
  /* 3 */
  /***/ function(module, exports, __webpack_require__) {

    'use strict';

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

    __webpack_require__(4);

    var LOADED_FETCHERS = {},
      FETCHER_EVENTS = {
        error: [],
        success: []
      }; // a hash of {error:[fns],success:[fns]} listeners for all the fetchers.

    function parseConfig(config) {
      if (!config.url) {
        if (window.location.pathname === '/') {
          config.url = window.location.href.substr(0, window.location.href.length - 1);
        } else {
          config.url = window.location.href.split(window.location.pathname)[0];
        }
        config.url += '/dispatch';
      }

      var tmp = config.url.split('://'),
        full = tmp[0] + '://' + tmp[1].replace(/\/\//g, '/');
      config.url = full;
      if (_typeof(config.headers) !== 'object' || !config.headers) config.headers = {};
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] = 'application/json';
      if (typeof config.authorization === 'string') {
        config.headers['Authorization'] = 'Bearer ' + config.authorization;
      }
      if (config.credentials === true) {
        config.credentials = 'include';
      }
      if (typeof config.credentials !== 'string') {
        config.credentials = 'same-origin';
      }
      return config;
    }

    function registerFetchEvent(name, type, fn) {
      if (['success', 'error'].indexOf(type) === -1) {
        console.warn('thorin-fetcher: on(event, fn): event should be either error or success.');
        return false;
      }
      if (typeof fn !== 'function') {
        console.warn('thorin-fetcher: on(event, fn): fn should be a function');
        return false;
      }
      var item = {
        fn: fn
      };
      if (typeof name === 'string') item.name = name;
      FETCHER_EVENTS[type].push(item);
      return true;
    }

    function handleFetchEvent(name, type, data) {
      if (typeof FETCHER_EVENTS[type] === 'undefined') return;
      if (FETCHER_EVENTS[type].length === 0) return;
      for (var i = 0; i < FETCHER_EVENTS[type].length; i++) {
        var item = FETCHER_EVENTS[type][i],
          shouldCall = typeof item.name === 'string' && item.name === name || typeof item.name === 'undefined';
        if (!shouldCall) continue;
        item.fn(data);
      }
    }

    function parseError(e, _status) {
      var err = void 0;
      if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && e) {
        if (e instanceof Error) {
          err = e;
        } else {
          err = new Error(e.message || 'Failed to complete fetch request.');
        }
      } else {
        e = {};
        err = new Error(e.message || 'Failed to complete fetch request');
      }
      Object.keys(e).forEach(function (key) {
        err[key] = e[key];
      });
      if (!err.code) err.code = 'SERVER_ERROR';
      if (!err.status) err.status = 500;
      if (_status) err.status = _status;
      return err;
    }

    /**
     * The thorin fetcher create() function will create a named fetcher object and return it.
     * Each fetcher instance can be used separately with different configurations.
     *
     * CONFIGURATION ARGUMENTS:
     *  - url (string) - the full URL of thorin's /dispatch endpoint (defaults to window URL + '/dispatch
     *  - headers (object)  - additional headers to send
     *  - authorization (string) - an additional Authorization: Bearer {token} to attach
     *  - credentials (boolean) - should we send the cookies when calling a different url? defaults to false
     * */
    function createFetcher(config, name) {
      parseConfig(config);
      /* This is the fetcher wrapper. */
      function doFetch(action, payload) {
        if ((typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object' && action && typeof action.type === 'string') {
          payload = action.payload;
          action = action.type;
        }
        if (typeof action !== 'string') {
          console.error('thorin-fetcher: usage fetcher("actionName", {payload})');
          return this;
        }
        if (typeof payload === 'undefined' || payload == null) payload = {};
        if ((typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) !== 'object' && !payload) {
          console.error('thorin-fetcher: payload must be an object.');
          return this;
        }
        var fetchBody = {
          type: action,
          payload: payload
        };
        var statusCode = void 0,
          statusMsg = void 0;
        return new Promise(function (resolve, reject) {
          fetch(config.url, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(fetchBody),
            credentials: config.credentials
          }).then(function (res) {
            statusCode = res.status;
            statusMsg = res.statusText;
            return res.json();
          }).then(function (res) {
            if (res.error) {
              throw res.error;
            }
            delete res.type;
            if (typeof res.meta === 'undefined') {
              handleFetchEvent(name, 'success', res.result);
              return resolve(res.result);
            }
            handleFetchEvent(name, 'success', res);
            resolve(res);
          }).catch(function (e) {
            var err = parseError(e, statusCode);
            handleFetchEvent(name, 'error', err);
            reject(err);
          });
        });
      }

      /* Overrides the default configuration with a key/value */
      doFetch.setConfig = function SetConfig(key, value) {
        if (typeof key === 'string' && typeof value !== 'string') {
          if (key === 'authorization') {
            config.headers['Authorization'] = 'Bearer ' + value;
          } else {
            config[key] = value;
          }
          return this;
        }
        console.warn('thorin-fetcher: usage: setConfig(key, value)');
        return this;
      };

      /* Listen for errors that the fetcher may have encountered. */
      doFetch.on = registerFetchEvent.bind(this, name);
      return doFetch;
    }

    /**
     * Prepares a file upload fetcher.
     * This works perfectly with thorin-plugin-upload
     * SAME configuration
     * */
    function createUploadFetcher(config) {
      parseConfig(config);
      if (!config.name) config.name = 'asset'; // the name of the file input
      delete config.headers['Content-Type'];
      var obj = {};
      var name = 'upload' + nidx;
      nidx++;
      /*
       * Creates an actual fetch request to be sent.
       * */
      obj.send = function SendUpload(fileObj) {
        return new Promise(function (resolve, reject) {
          if ((typeof fileObj === 'undefined' ? 'undefined' : _typeof(fileObj)) !== 'object' || !fileObj || typeof fileObj.type !== 'string' || typeof fileObj.name !== 'string') {
            return reject(parseError(new Error('Please select a file to upload.')));
          }
          var data = new FormData();
          data.append(config.name, fileObj);
          var statusCode = void 0,
            statusMsg = void 0;
          var fetchOpt = {
            method: 'POST',
            headers: config.headers,
            credentials: config.credentials,
            body: data
          };
          fetch(config.url, fetchOpt).then(function (res) {
            statusCode = res.status;
            statusMsg = res.statusText;
            return res.json();
          }).then(function (res) {
            if (res.error) {
              throw res.error;
            }
            delete res.type;
            if (typeof res.meta === 'undefined') {
              handleFetchEvent(name, 'success', res.result);
              return resolve(res.result);
            }
            handleFetchEvent(name, 'success', res);
            resolve(res);
          }).catch(function (e) {
            var err = parseError(e, statusCode);
            handleFetchEvent(name, 'error', err);
            reject(err);
          });
        });
      };
      obj.on = registerFetchEvent.bind(this, name);
      return obj;
    }

    /**
     * This is the implicit fetcher creator.
     * Arguments:
     *  - name (string) if specified with no options, it will try returning the given fetcher by name or null.
     *  - name (object) if specified as an object, it will return a fetcher instance withouth caching it.
     *  - opt (object) - used with name, creates and saves a fetcher instance.
     * */
    var nidx = 0;
    function create(name, opt) {
      // RETURN a fetcher.
      if (typeof name === 'string' && typeof opt === 'undefined') {
        return LOADED_FETCHERS[name] || null;
      }
      nidx++;
      // CREATE anonymous
      if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object' && name && typeof opt === 'undefined') {
        return createFetcher(name, 'fetcher' + nidx);
      }
      // CREATE named fetcher
      if (typeof name === 'string' && (typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) === 'object' && opt) {
        if (typeof LOADED_FETCHERS[name] !== 'undefined') {
          console.warn('thorin-fetch: fetcher called ' + name + ' already exists. Returning it in stead.');
          return LOADED_FETCHERS[name];
        }
        var fetcherObj = createFetcher(opt, name);
        LOADED_FETCHERS[name] = fetcherObj;
        return fetcherObj;
      }
      console.error('thorin-fetcher: invalid arguments for fetcher()');
    }
    module.exports = create;
    /*
     * Attach the createUploadFetcher functionality
     * */
    module.exports.upload = createUploadFetcher;
    /* Listen to specific events on all fetchers. */
    module.exports.on = registerFetchEvent.bind(module.exports, undefined);

    /***/ },
  /* 4 */
  /***/ function(module, exports) {

    (function(self) {
      'use strict';

      if (self.fetch) {
        return
      }

      var support = {
        searchParams: 'URLSearchParams' in self,
        iterable: 'Symbol' in self && 'iterator' in Symbol,
        blob: 'FileReader' in self && 'Blob' in self && (function() {
          try {
            new Blob()
            return true
          } catch(e) {
            return false
          }
        })(),
        formData: 'FormData' in self,
        arrayBuffer: 'ArrayBuffer' in self
      }

      function normalizeName(name) {
        if (typeof name !== 'string') {
          name = String(name)
        }
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
          throw new TypeError('Invalid character in header field name')
        }
        return name.toLowerCase()
      }

      function normalizeValue(value) {
        if (typeof value !== 'string') {
          value = String(value)
        }
        return value
      }

      // Build a destructive iterator for the value list
      function iteratorFor(items) {
        var iterator = {
          next: function() {
            var value = items.shift()
            return {done: value === undefined, value: value}
          }
        }

        if (support.iterable) {
          iterator[Symbol.iterator] = function() {
            return iterator
          }
        }

        return iterator
      }

      function Headers(headers) {
        this.map = {}

        if (headers instanceof Headers) {
          headers.forEach(function(value, name) {
            this.append(name, value)
          }, this)

        } else if (headers) {
          Object.getOwnPropertyNames(headers).forEach(function(name) {
            this.append(name, headers[name])
          }, this)
        }
      }

      Headers.prototype.append = function(name, value) {
        name = normalizeName(name)
        value = normalizeValue(value)
        var list = this.map[name]
        if (!list) {
          list = []
          this.map[name] = list
        }
        list.push(value)
      }

      Headers.prototype['delete'] = function(name) {
        delete this.map[normalizeName(name)]
      }

      Headers.prototype.get = function(name) {
        var values = this.map[normalizeName(name)]
        return values ? values[0] : null
      }

      Headers.prototype.getAll = function(name) {
        return this.map[normalizeName(name)] || []
      }

      Headers.prototype.has = function(name) {
        return this.map.hasOwnProperty(normalizeName(name))
      }

      Headers.prototype.set = function(name, value) {
        this.map[normalizeName(name)] = [normalizeValue(value)]
      }

      Headers.prototype.forEach = function(callback, thisArg) {
        Object.getOwnPropertyNames(this.map).forEach(function(name) {
          this.map[name].forEach(function(value) {
            callback.call(thisArg, value, name, this)
          }, this)
        }, this)
      }

      Headers.prototype.keys = function() {
        var items = []
        this.forEach(function(value, name) { items.push(name) })
        return iteratorFor(items)
      }

      Headers.prototype.values = function() {
        var items = []
        this.forEach(function(value) { items.push(value) })
        return iteratorFor(items)
      }

      Headers.prototype.entries = function() {
        var items = []
        this.forEach(function(value, name) { items.push([name, value]) })
        return iteratorFor(items)
      }

      if (support.iterable) {
        Headers.prototype[Symbol.iterator] = Headers.prototype.entries
      }

      function consumed(body) {
        if (body.bodyUsed) {
          return Promise.reject(new TypeError('Already read'))
        }
        body.bodyUsed = true
      }

      function fileReaderReady(reader) {
        return new Promise(function(resolve, reject) {
          reader.onload = function() {
            resolve(reader.result)
          }
          reader.onerror = function() {
            reject(reader.error)
          }
        })
      }

      function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader()
        reader.readAsArrayBuffer(blob)
        return fileReaderReady(reader)
      }

      function readBlobAsText(blob) {
        var reader = new FileReader()
        reader.readAsText(blob)
        return fileReaderReady(reader)
      }

      function Body() {
        this.bodyUsed = false

        this._initBody = function(body) {
          this._bodyInit = body
          if (typeof body === 'string') {
            this._bodyText = body
          } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body
          } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this._bodyText = body.toString()
          } else if (!body) {
            this._bodyText = ''
          } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
            // Only support ArrayBuffers for POST method.
            // Receiving ArrayBuffers happens via Blobs, instead.
          } else {
            throw new Error('unsupported BodyInit type')
          }

          if (!this.headers.get('content-type')) {
            if (typeof body === 'string') {
              this.headers.set('content-type', 'text/plain;charset=UTF-8')
            } else if (this._bodyBlob && this._bodyBlob.type) {
              this.headers.set('content-type', this._bodyBlob.type)
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
            }
          }
        }

        if (support.blob) {
          this.blob = function() {
            var rejected = consumed(this)
            if (rejected) {
              return rejected
            }

            if (this._bodyBlob) {
              return Promise.resolve(this._bodyBlob)
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as blob')
            } else {
              return Promise.resolve(new Blob([this._bodyText]))
            }
          }

          this.arrayBuffer = function() {
            return this.blob().then(readBlobAsArrayBuffer)
          }

          this.text = function() {
            var rejected = consumed(this)
            if (rejected) {
              return rejected
            }

            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob)
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as text')
            } else {
              return Promise.resolve(this._bodyText)
            }
          }
        } else {
          this.text = function() {
            var rejected = consumed(this)
            return rejected ? rejected : Promise.resolve(this._bodyText)
          }
        }

        if (support.formData) {
          this.formData = function() {
            return this.text().then(decode)
          }
        }

        this.json = function() {
          return this.text().then(JSON.parse)
        }

        return this
      }

      // HTTP methods whose capitalization should be normalized
      var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

      function normalizeMethod(method) {
        var upcased = method.toUpperCase()
        return (methods.indexOf(upcased) > -1) ? upcased : method
      }

      function Request(input, options) {
        options = options || {}
        var body = options.body
        if (Request.prototype.isPrototypeOf(input)) {
          if (input.bodyUsed) {
            throw new TypeError('Already read')
          }
          this.url = input.url
          this.credentials = input.credentials
          if (!options.headers) {
            this.headers = new Headers(input.headers)
          }
          this.method = input.method
          this.mode = input.mode
          if (!body) {
            body = input._bodyInit
            input.bodyUsed = true
          }
        } else {
          this.url = input
        }

        this.credentials = options.credentials || this.credentials || 'omit'
        if (options.headers || !this.headers) {
          this.headers = new Headers(options.headers)
        }
        this.method = normalizeMethod(options.method || this.method || 'GET')
        this.mode = options.mode || this.mode || null
        this.referrer = null

        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
          throw new TypeError('Body not allowed for GET or HEAD requests')
        }
        this._initBody(body)
      }

      Request.prototype.clone = function() {
        return new Request(this)
      }

      function decode(body) {
        var form = new FormData()
        body.trim().split('&').forEach(function(bytes) {
          if (bytes) {
            var split = bytes.split('=')
            var name = split.shift().replace(/\+/g, ' ')
            var value = split.join('=').replace(/\+/g, ' ')
            form.append(decodeURIComponent(name), decodeURIComponent(value))
          }
        })
        return form
      }

      function headers(xhr) {
        var head = new Headers()
        var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
        pairs.forEach(function(header) {
          var split = header.trim().split(':')
          var key = split.shift().trim()
          var value = split.join(':').trim()
          head.append(key, value)
        })
        return head
      }

      Body.call(Request.prototype)

      function Response(bodyInit, options) {
        if (!options) {
          options = {}
        }

        this.type = 'default'
        this.status = options.status
        this.ok = this.status >= 200 && this.status < 300
        this.statusText = options.statusText
        this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
        this.url = options.url || ''
        this._initBody(bodyInit)
      }

      Body.call(Response.prototype)

      Response.prototype.clone = function() {
        return new Response(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Headers(this.headers),
          url: this.url
        })
      }

      Response.error = function() {
        var response = new Response(null, {status: 0, statusText: ''})
        response.type = 'error'
        return response
      }

      var redirectStatuses = [301, 302, 303, 307, 308]

      Response.redirect = function(url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
          throw new RangeError('Invalid status code')
        }

        return new Response(null, {status: status, headers: {location: url}})
      }

      self.Headers = Headers
      self.Request = Request
      self.Response = Response

      self.fetch = function(input, init) {
        return new Promise(function(resolve, reject) {
          var request
          if (Request.prototype.isPrototypeOf(input) && !init) {
            request = input
          } else {
            request = new Request(input, init)
          }

          var xhr = new XMLHttpRequest()

          function responseURL() {
            if ('responseURL' in xhr) {
              return xhr.responseURL
            }

            // Avoid security warnings on getResponseHeader when not allowed by CORS
            if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
              return xhr.getResponseHeader('X-Request-URL')
            }

            return
          }

          xhr.onload = function() {
            var options = {
              status: xhr.status,
              statusText: xhr.statusText,
              headers: headers(xhr),
              url: responseURL()
            }
            var body = 'response' in xhr ? xhr.response : xhr.responseText
            resolve(new Response(body, options))
          }

          xhr.onerror = function() {
            reject(new TypeError('Network request failed'))
          }

          xhr.ontimeout = function() {
            reject(new TypeError('Network request failed'))
          }

          xhr.open(request.method, request.url, true)

          if (request.credentials === 'include') {
            xhr.withCredentials = true
          }

          if ('responseType' in xhr && support.blob) {
            xhr.responseType = 'blob'
          }

          request.headers.forEach(function(value, name) {
            xhr.setRequestHeader(name, value)
          })

          xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
        })
      }
      self.fetch.polyfill = true
    })(typeof self !== 'undefined' ? self : this);


    /***/ }
  /******/ ]);