

/*
Configure Port for Vue App
---------------------------

Because most of HTTP Server use CORS configuration that accepts
resource sharing restricted to some sites or ports, so we also
need to configure port for our App.

In project root folder, create vue.config.js file with following content:
*/

module.exports = {
  devServer: {
    port: 8081
  }
}
