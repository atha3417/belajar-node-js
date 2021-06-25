const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// Setup EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Konfigurasi flash
app.use(cookieParser("secret"));
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

// Halaman Home
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
    });
});

// Halaman About
app.get("/about", (req, res) => {
    res.render("about", {
        title: "Halaman About",
    });
});

// Halaman Contact
app.get("/contact", async (req, res) => {
    const contacts = await Contact.find();
    res.render("contact/index", {
        title: "Halaman Contact",
        contacts,
        msg: req.flash("msg"),
    });
});

// Halaman Detail Contact
app.get("/contact/:nama", async (req, res) => {
    const contact = await Contact.findOne({ nama: decodeURI(req.params.nama) });
    res.render("contact/detail", {
        title: "Halaman Detail Contact",
        contact,
    });
});

app.listen(port, () => {
    console.log(`Mongo contact app | Listening at http://localhost:${port}`);
});
