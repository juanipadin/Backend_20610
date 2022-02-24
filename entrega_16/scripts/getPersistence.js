const { PERS } = require("../src/config")

const getPersistence = () => {
    console.log(process.argv[2])
    return PERS.fileSystem
  }
  
  module.exports = getPersistence