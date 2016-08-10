module.exports = {
  build: {
    
    ////////////////////////////////////////////////////////////////////////////////////
    // Copy ./app/index.html to ./build/index.html (LHS)
    ////////////////////////////////////////////////////////////////////////////////////
    "index.html": "index.html",
    "home.html" : "home.html",
    "details.html":"details.html",
    "access.html" : "access.html",
    
    ////////////////////////////////////////////////////////////////////////////////////
    // Concatenate and Copy js/app.js to app.js in the build folder
    ////////////////////////////////////////////////////////////////////////////////////
    "app.js": [
         "js/vendor/jquery.min.js",
         "js/vendor/angular.min.js",
         "js/vendor/angular-route.min.js",
         "js/vendor/bootstrap.min.js",
         "js/app.js",
         "js/controllers/accountcontroller.js",
         "js/controllers/homecontroller.js",
         "js/controllers/lockcontroller.js",
         "js/factories/accountfactory.js",
         "js/factories/homefactory.js",
         "js/factories/lockfactory.js" 
    ],

    ////////////////////////////////////////////////////////////////////////////////////
    // Concatenate and Copy css/app.css to target app.css in the build folder
    ////////////////////////////////////////////////////////////////////////////////////    
    "app.css": ["css/bootstrap.min.css","css/app.css"],


    ////////////////////////////////////////////////////////////////////////////////////
    // Copy Images Folder To Target Images
    ////////////////////////////////////////////////////////////////////////////////////
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
