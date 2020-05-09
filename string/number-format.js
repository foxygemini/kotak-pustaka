/**
 * Format number with thousand separator
 * @since 1.0.0
 * @param {number} num - Number data
 * @returns {string}
 */
module.exports = num => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')