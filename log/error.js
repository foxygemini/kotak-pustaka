const Sentry = require("@sentry/node");

/**
 * Error logger, will be send to sentry
 * @author Juniawan
 * @version 1.0.0
 * @since 1.0.0
 * @async
 * @param {string} scene - Where is this happen
 * @param {string} subject - What is going on
 * @param {string} errMessage - What error object said
 * @param {string} fileName - On which file error triggered
 * @param {string} lineNumber - On which line error triggered
 * @param {string} metaData - What meta data provided to support analize the error
 * @example
 * process.errorLog(scene, "Sample error", err, __filename, __linenumber, {data: makemeerror});
 */
module.exports = async (scene, subject, err, fileName, lineNumber, metaData) => {
  process.traceLog('error', subject, fileName, lineNumber, err, scene);
  Sentry.configureScope(scope => {
    scope.setExtra("Subject", subject);
    scope.setExtra("Happen on", process.env.SETUP_AT);
    scope.setExtra("Scene", scene);
    scope.setExtra("Executor Server", `${process.env.APP_NAME} (${process.env.NODE_ENV})`);
    scope.setExtra("File Name", fileName);
    scope.setExtra("Line number", lineNumber);
    scope.setExtra("Data passed", `${metaData?metaData:"-"}`);
  });
  Sentry.captureException(err);
}