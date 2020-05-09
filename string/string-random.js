/**
 * Generate random string
 * @since 1.0.0
 * @param {number} length - Length of random string
 * @param {('full'|'onlynumber'|'charlower'|'charupper')} [charOptions] - Char options
 * @returns {string}
 */
module.exports = (length, charOptions) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  switch(charOptions){
    case "full":
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=[]{}<>?/';
      break;
    case "onlynumber":
      characters = "1234567890";
      break;
    case "charlower":
      characters = 'abcdefghijklmnopqrstuvwxyz';
      break;
    case "charupper":
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      break;
  }
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}