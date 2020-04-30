# onesheet.press

Uses Node.js and the WordPress REST API to build a generative poetry journal

### WordPress configuration
* Install [Custom Post Types UI plugin](https://wordpress.org/plugins/custom-post-type-ui/) 
* Create Custom Post Types
    * Minimum viable product Custom Post Type objects:
        * Issues
            * Can contain inherited objects below, but inherited objects can also be orphaned.
        * Poetry
        * Interviews 
        * Reviews
        * Referenced from:
            * http://www.harpyhybridreview.org 
    * Future Custom Post Types (can be inherited objects of Issue type):
        * Nonfiction
        * Fiction
        * Art
        * Books
        * Bios
        * Reference sites:
            * https://www.greenlindenpress.com/
            * https://www.upthestaircase.org/
            * https://www.terrain.org/ 
    * Set "Show in Rest API" to "True"
    * Set REST API base slug
    * Select attributes to be made available in the "Supports" area
        * Excerpt
        * Author
* Create test Issues, Poems and articles with test values
* Install [Advanced Custom Fields plugin](https://wordpress.org/plugins/advanced-custom-fields/)
    * Add test fields to objects.
* Install [ACF to REST API plugin](https://wordpress.org/plugins/acf-to-rest-api/) to retrieve Advanced Custom Field data.
* Install [Better REST API Featured Images](https://wordpress.org/plugins/better-rest-api-featured-images/) to more easily retrieve featured image data.
* Adjust Permalink settings to use "Post name"
* Install the [JWT Authentication for WP REST API](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) plugin
* Modify .htaccess file to include HTTP authorization rules
* Add secret key and CORS config to wp-config.php
* References: 
    * [Traversy Media](https://www.youtube.com/watch?v=fFNXWinbgro)
    * [Web Dev Profesh](https://www.youtube.com/watch?v=FXJYwsJmOJQ)
    * [JWT Authentication for WP REST API plugin documentation](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/#description)


### Future functionality
* Queries Google Image Search API for “medieval fantasy wallpaper” and “medieval hybrid animal prints”
    * https://stackoverflow.com/questions/34035422/google-image-search-says-api-no-longer-available
* download image from URL
    * https://stackoverflow.com/questions/12740659/downloading-images-with-node-js
* Programmatically upload local image to WordPress media library via Node.js
    * https://stackoverflow.com/questions/33524625/cant-upload-image-file-using-wordpress-rest-api-node-js
* save URL or file location in SQL table for images
    * Table also includes column for associated WP post id
* write stored procedure to return all images not used in the post
* Locate all rows representing images where "attached_to_post" != 0
* uses image id to create the post
* if the image is used in a post, update table
* automate the poetry
* automate the articles
* fake authors, fake issues, fake stories

### Possible alternative implementation in PHP:
* Run a PHP script on cron task
* Asynchronous PHP file queries Google Img search
* Programmatically upload images via built-in WordPress PHP functions
    * https://wordpress.stackexchange.com/questions/256830/programmatically-adding-images-to-media-library/320994
* Save URL of images in SQL table.
    * Table also includes column for associated WP post id
* Separate JavaScript code queries SQL table and creates post with img ID