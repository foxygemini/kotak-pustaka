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
 * @param {string} scene What meta data provided to support analize the error
 * @param {*} [scene=process.scene] - if want to trace to level data
 * @param {*} [data] - if want to trace to level data
 * @example
 * process.traceLog("info", "This action trace", __filename, __linenumber);
 */
module.exports = (status, message, filename, linenumber, scene, data) => {
  if(process.env.NODE_ENV=='production') return;
  if(typeof arguments[5] === "undefined"){
    if(typeof this.arguments[4] != 'string'){
      data = scene;
      scene = process.scene;
      
    }
  }
  if(!scene) scene = process.scene;

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
  console.log(renderStatus(status, message));
  console.log(chalk.cyan(`----------------------------------------------------------------`));
  console.log(`${chalk.cyan("MACHINE")}\t: ${chalk.green(process.env.SETUP_AT)}`);
  console.log(`${chalk.cyan("APP")}\t: ${chalk.green(process.env.APP_NAME+":"+process.env.APP_PORT)}`);
  console.log(`${chalk.cyan("SCENE")}\t: ${chalk.green(scene)} - ${chalk.green((new Date()).toISOString())}`);
  console.log(`${chalk.cyan("FILE")}\t: ${filename}`);
  console.log(`${chalk.cyan("LINE")}\t: ${linenumber}`);
  if(data){    
    console.log(chalk.cyan("DATA"), chalk.cyan(typeof data), chalk.cyan(":"));
    console.log(data);
  }
  console.log(`================================================================`);
}