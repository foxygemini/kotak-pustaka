const Sentry = require("@sentry/node");

/**
 * Error logger, will be send to sentry
 * @author Juniawan
 * @version 1.0.0
 * @since 1.0.0
 * @async
 * @param {string} subject - What is going on
 * @param {string} errMessage - What error object said
 * @param {string} fileName - On which file error triggered
 * @param {string} lineNumber - On which line error triggered
 * @param {string} [metaData] - What meta data provided to support analize the error
 * @param {string} [caller] - System caller, only provide if request from another service/machine
 * @example
 * process.errorLog("Sample error", err, __filename, __linenumber, {data: makemeerror}, caller);
 */
module.exports = async (subject, err, fileName, lineNumber, metaData, caller) => {
  process.traceLog('error', subject, fileName, lineNumber, {err, metaData}, caller);
  Sentry.configureScope(scope => {
    scope.setExtra("Subject", subject);
    scope.setExtra("Happen on", process.env.SETUP_AT);
    if(caller){
      scope.setExtra("System caller", caller);
    }
    scope.setExtra("App Name", `${process.env.APP_NAME} (${process.env.NODE_ENV})`);
    scope.setExtra("File Name", fileName);
    scope.setExtra("Line number", lineNumber);
    if(metaData){
      scope.setExtra("Data passed", metaData);
    }
  });
  Sentry.captureException(err);
}