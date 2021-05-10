const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    // res.send("<h1>Hello World!</h1>");
    // res.json({
    //     nama: "Atha",
    //     email: "Atha.3417@gmail.com",
    //     noHP: "082123883371",
    // });
    res.sendFile("./index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
    res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
    res.sendFile("./contact.html", { root: __dirname });
});

app.get("/product/:id", (req, res) => {
    res.send(
        `Product ID: ${req.params.id} <br/> Category ID: ${req.query.category}`
    );
});

app.use("/", (req, res) => {
    res.status(404);
    res.send("<h1>404 Not Found!</h1>");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// const http = require("http");
// const fs = require("fs");
// const port = 3000;

// const renderHTML = (path, res) => {
//     fs.readFile(path, "utf-8", (err, data) => {
//         if (err) {
//             res.writeHead(404);
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// };

// http.createServer((req, res) => {
//     res.writeHead(200, {
//         "Content-Type": "text/html",
//     });

//     const url = req.url;
//     switch (url) {
//         case "/about":
//             renderHTML("./about.html", res);
//             break;
//         case "/contact":
//             renderHTML("./contact.html", res);
//             break;
//         default:
//             renderHTML("./index.html", res);
//             break;
//     }
// }).listen(port, () => {
//     console.log(`Server listening on port ${port}...`);
// });
