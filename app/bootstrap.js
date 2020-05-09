Object.defineProperty(global, '__stack', {
  get: function() {
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack) {
      return stack;
    };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});
  
Object.defineProperty(global, '__linenumber', {
  get: function() {
    return __stack[1].getLineNumber();
  }
});

Object.defineProperty(global, '__function', {
  get: function() {
    return __stack[1].getFunctionName();
  }
});

const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });

process.traceLog = require("./../log/profiler");
process.errorLog = require("./../log/error");

const i18n = require("i18n");
i18n.configure({
  locales:['en'],
  directory: `${process.connectionLibsPath}/i18n`,
  objectNotation: true,
  updateFiles: false
});

Object.defineProperty(global, '__trans', {
  get: function(){
    return i18n.__;
  }
});

Object.defineProperty(global, 'i18n', {
  get: function(){
    return i18n;
  }
});