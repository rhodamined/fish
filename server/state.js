// ------------- IMPORT & CONFIG ------------- //

// google sheets
// https://theoephraim.github.io/node-google-spreadsheet/#/
const google_auth = require('./google_oauth');
const { GoogleSpreadsheet } = require('google-spreadsheet');

// .env variables
const dotenv = require('dotenv');
dotenv.config();
const FISH_SHEETID = process.env.FISH_SHEETID;


async function testServiceAccountAuth() {

  const serviceAccountAuth = await google_auth.getAccessTokenFromImpersonatedCredentials();
  console.log(serviceAccountAuth.token); // prints the access token

}

// test
// (async () => {
//   await testServiceAccountAuth();
// })();