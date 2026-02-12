const   path                    = require("path"),
        express                 = require("express"),
        app                     = express();

const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use('/assets', express.static(__dirname + '/assets/'));

app.get("/", function(req, res) {
	res.render("maintenance/index");
});

app.use(function(req, res) {
    res.status(404).render("error", {
        title: "Page not found",
        message: "The page you requested could not be found."
    });
});

app.use(function(err, req, res, next) {
    res.status(500).render("error", {
        title: "Something went wrong",
        message: "An unexpected error occurred. Please try again later."
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
