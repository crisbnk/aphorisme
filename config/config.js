const dotenv = require('dotenv');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
dotenv.config({ path: 'variables.env' });

module.exports.aws = () => {
   return {
     region: process.env.REGION
   };
}
