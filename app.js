const   path                    = require("path"),
        express                 = require("express"),
        app                     = express();

const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.set("public", path.join(__dirname, "public"));
app.use('/assets', express.static(__dirname + '/assets/'));

app.get("/", function(req, res) {
	res.render("maintenance/index");
});

// for google and other search engines to know the site is under maintenance and not dead, we need to serve a sitemap.xml and robots.txt
app.get('/sitemap.xml', function(req, res) {
    res.header('Content-Type', 'application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
        <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
            <url>
                <loc>https://djvitsolutions.com/</loc>
                <lastmod>2026-02-13T02:50:12+00:00</lastmod>
            </url>
        </urlset>`);
});

//for bing and other search engines to know the site is under maintenance and not dead, we need to serve a sitemap.xml and robots.txt
app.get('/BingSiteAuth.xml', function(req, res) {
    res.sendFile(path.join(__dirname,'public' ,'BingSiteAuth.xml'));
});

app.get('/robots.txt', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
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
