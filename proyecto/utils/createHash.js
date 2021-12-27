const bCrypt = require('bCrypt')


/**
 * 
 * @param {string} password - The password to be hashed
 * @returns {string} password hashed
 */
const createHash = (password) => bCrypt.hashSync(
  password,
  bCrypt.genSaltSync(10),
  null);

module.exports= createHash;