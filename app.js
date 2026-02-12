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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
