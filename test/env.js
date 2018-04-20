const dotenv = require('dotenv');

dotenv.config({
  path: './.env'
});

module.exports = {
  username: process.env.ONEPOINT_USERNAME,
  password: process.env.ONEPOINT_PASSWORD,
  companyShortName: process.env.ONEPOINT_COMPANY_SHORT_NAME,
  apiKey: process.env.ONEPOINT_API_KEY
};
