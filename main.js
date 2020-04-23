////////////////////////////////////////////////////////////////////////////////
// Project: Onesheet.press
// Description: Uses Node.js and the WordPress REST API
//              to build a generative poetry journal
// Author: zacfinger.com
// Date: 2020 April
// License: MIT
////////////////////////////////////////////////////////////////////////////////
// TODO: Uninstall unused NPM packages
// Ref: https://medium.com/stackfame/how-to-npm-unistall-unused-packages-in-node-js-ea80afb6d1a7
//      https://stackoverflow.com/questions/21417014/npm-command-to-uninstall-or-prune-unused-packages-in-node-js
////////////////////////////////////////////////////////////////////////////////
//
// Include node-fetch to make HTTP requests.
// Ref: https://github.com/node-fetch/node-fetch
const fetch = require("node-fetch");
//
// Retrieve WordPress environment variables
var config = require( './config.js' );
const token_endpoint = config.url + '/jwt-auth/v1/token';
//
// Authenticate to POST (create) a post.
// Username and password are passed in the body. 
// Ref: https://wordpress.org/support/topic/authenticate-via-javascript-fetch-for-rest-api/#post-10769682
//      https://stackoverflow.com/questions/46157487/react-native-jwt-auth-error-fetching-api      
//      https://www.valentinog.com/blog/http-js/
const getToken = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": config.username,
        "password": config.password
      })
    })
    
    const json = await response.json();
    return json.token;
    
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//TODO: create makePosts function
/*const makePosts = async () => {
  try {

  }
};*/

const main = async () => {
  // Return token from asynchronous function and store in global
  // Ref: https://stackoverflow.com/questions/48327559/save-async-await-response-on-a-variable
  //      http://www.vincentcatalano.com/
  //      https://medium.com/@milankrushna/window-is-not-defined-3a32b709e40f
  global["token"] = "Bearer " + await getToken(token_endpoint);
  console.log(global["token"]);
  // TODO: await makePosts()
};

( async () => {

  try {
    await main();
  } catch(err) {
    console.log("Main application failure: ");
    console.error(err);
  }
})();

