const chalk = require("chalk");

/**
 * Profiler logger, to easier to trace process
 * @author Juniawan
 * @version 1.0.0
 * @since 1.0.0
 * @async
 * @param {('info'|'warning'|'error')} status - Where is this happen
 * @param {string} message - What is going on
 * @param {string} fileName On which file error triggered
 * @param {string} lineNumber On which line error triggered
 * @param {string} [caller] - Trace if request from another machine
 * @param {object} [data] - if want to trace to level data
 * @example
 * process.traceLog("info", "This action trace", __filename, __linenumber);
 */
module.exports = (status, message, filename, linenumber, data, caller) => {
  if(process.env.NODE_ENV=='production') return;

  if(typeof caller == "undefined"){
    if(typeof data == "string"){
      caller = data;
      data = undefined;
    }
  }

  /**
   * Render message by it's status
   * @param {('info'|'warning'|'error')} status - Where is this happen
   * @param {string} message - What is going on
   */
  const renderStatus = (status, message) => {
    switch(status){
      case "error":
        return `${chalk.red("ERROR")} -  ${chalk.red(message)}`;
      case "warning":
        return `${chalk.yellow("WARNING")} -  ${chalk.yellow(message)}`;
      case "info":
        return `${chalk.cyan("INFO")} -  ${chalk.cyan(message)}`;
      default:
        return `${chalk.gray("UNKNOWN")} -  ${chalk.gray(message)}`;
    }
  }
  console.log(`${chalk.cyan("SUBJECT")}\t: ${renderStatus(status, message)}`);
  console.log(chalk.cyan(`----------------------------------------------------------------`));
  console.log(`${chalk.cyan("MACHINE")}\t: ${chalk.green(process.env.SETUP_AT)} - ${chalk.green((new Date()).toISOString())}`);
  console.log(`${chalk.cyan("APP")}\t: ${chalk.green(process.env.APP_NAME+":"+process.env.APP_PORT)}`);
  if(caller){
    console.log(`${chalk.cyan("CALLER")}\t: ${chalk.green(caller)}`);
  }
  console.log(`${chalk.cyan("FILE")}\t: ${filename}`);
  console.log(`${chalk.cyan("LINE")}\t: ${linenumber}`);
  if(data){    
    console.log(chalk.cyan("DATA"), chalk.cyan(typeof data), chalk.cyan(":"));
    console.log(data);
  }
  console.log(`================================================================`);
}