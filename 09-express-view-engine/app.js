const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");
app.use(expressLayouts);
// app.set("layout", "layouts/main-layout");

app.get("/", (req, res) => {
    const mahasiswa = [
        {
            nama: "Bibbie Tunder",
            email: "btunder0@addthis.com",
        },
        {
            nama: "Rosita Flory",
            email: "rflory1@google.com.hk",
        },
        {
            nama: "Khalil Maleck",
            email: "kmaleck2@latimes.com",
        },
    ];
    res.render("index", {
        nama: "Atha Tsaqif",
        title: "Halaman Home",
        mahasiswa,
        layout: "layouts/main-layout",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "Halaman About",
        layout: "layouts/main-layout",
    });
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Halaman Contact",
        layout: "layouts/main-layout",
    });
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
