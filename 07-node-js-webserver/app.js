const http = require("http");
const fs = require("fs");
const port = 3000;

const renderHTML = (path, res) => {
    fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            res.writeHead(404);
        } else {
            res.write(data);
        }
        res.end();
    });
};

http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html",
    });

    const url = req.url;
    switch (url) {
        case "/about":
            renderHTML("./about.html", res);
            break;
        case "/contact":
            renderHTML("./contact.html", res);
            break;
        default:
            renderHTML("./index.html", res);
            break;
    }
}).listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
