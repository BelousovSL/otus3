const Pool = require("pg").Pool;
const bdconf = require("./config/database");
const pool = new Pool(bdconf.hrPool);

module.exports = pool;
