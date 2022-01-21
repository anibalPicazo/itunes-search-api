var routes = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("REST API call of '/'");
  });
}
module.exports = routes;