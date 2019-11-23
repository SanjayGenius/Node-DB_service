var appRouter = function(app) {
    app.get("/db", function(req,res) {
            res.send("SUCCESS");
    });

}

module.exports = appRouter