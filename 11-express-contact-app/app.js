const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact } = require("./utils/contacts");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));

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

app.get("/about", (req, res, next) => {
    res.render("about", {
        title: "Halaman About",
        layout: "layouts/main-layout",
    });
});

app.get("/contact", (req, res) => {
    const contacts = loadContact();
    res.render("contact", {
        title: "Halaman Contact",
        layout: "layouts/main-layout",
        contacts,
    });
});

app.get("/contact/:nama", (req, res) => {
    const contact = findContact(decodeURI(req.params.nama));
    res.render("detail", {
        title: "Halaman Detail Contact",
        layout: "layouts/main-layout",
        contact,
    });
});

app.use((req, res) => {
    res.status(404);
    res.send("<h1>404 Not Found!</h1>");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
