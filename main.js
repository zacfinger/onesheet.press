////////////////////////////////////////////////////////////////////////////////
// Project: Onesheet.press
// Description: Uses Node.js to query WordPress API and make programmatic posts
// Author: zacfinger.com
// Date: 2020 April
// License: MIT
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Uses WordPress REST API client for JavaScript by WordPress REST API Team
// Ref: http:v2.wp-api.org
//      https://github.com/WP-API/node-wpapi
//
// Error 'Cannot find module 'wpapi/superagent'' resolved 
// by installing superagent via user iabbaskhan's recommendation
// Ref: https://github.com/WP-API/node-wpapi/issues/451
var WPAPI = require( 'wpapi' );
var config = require( './config.js' );

// You must authenticate to be able to POST (create) a post
// by adding JSON Basic Authentication plugin to WordPress
// Ref: https://github.com/WP-API/node-wpapi#authentication
//      https://github.com/datocms/js-datocms-client/issues/69
//      https://github.com/WP-API/Basic-Auth
var wp = new WPAPI({
    endpoint: config.endpoint,
    // This assumes you are using basic auth, as described further below
    username: config.username,
    password: config.password
});
wp.posts().create({
    // Create the post
    // Ref: https://github.com/WP-API/node-wpapi#using-the-client
    //      http://wp-api.org/node-wpapi/using-the-client/#creating-posts
    //
    // "title" and "content" are the only required properties
    title: 'Your Post Title',
    content: 'Your post content',
    // Post will be created as a draft by default if a specific "status"
    // is not specified
    status: 'publish'
}).then(function( response ) {
    // Traversy Media video helpful in resolving "UnhandledPromiseRejectionWarning"
    // Ref: https://www.youtube.com/watch?v=fFNXWinbgro
    //
    // "response" will hold all properties of your newly-created post,
    // including the unique `id` the post was assigned on creation
    console.log( response.id );
    console.log( response );
}).catch(function(err){
    console.log(err);
});

