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
const post_endpoint = config.url + '/wp/v2/posts';
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

// Create a post with a given post_title
const makePosts = async (post_title) => {
  try {
    const response = await fetch(post_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': global["token"]
      },
      body: JSON.stringify({
        "title": post_title,
        "content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "status":"publish"
      })
    })
    
    const json = await response.json();
    return json;
    
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const main = async () => {
  // Return token from asynchronous function and store in global
  // Ref: https://stackoverflow.com/questions/48327559/save-async-await-response-on-a-variable
  //      http://www.vincentcatalano.com/
  //      https://medium.com/@milankrushna/window-is-not-defined-3a32b709e40f
  global["token"] = "Bearer " + await getToken(token_endpoint);
  
  // Construst current time string
  // Ref: https://tecadmin.net/get-current-date-time-javascript/
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  response = await makePosts("New test post made at " + time);

  console.log(response);
};

( async () => {

  try {
    await main();
  } catch(err) {
    console.log("Main application failure: ");
    console.error(err);
  }
})();

