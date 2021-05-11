const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
    loadContacts,
    findContact,
    addContact,
    cekDuplikat,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

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

app.get("/about", (req, res, next) => {
    res.render("about", {
        title: "Halaman About",
    });
});

app.get("/contact", (req, res) => {
    const contacts = loadContacts();
    res.render("contact/index", {
        title: "Halaman Contact",
        contacts,
        msg: req.flash("msg"),
    });
});

app.post(
    "/contact",
    [
        body("nama").custom((value) => {
            const duplikat = cekDuplikat(value);
            if (duplikat) {
                throw new Error("Nama contact sudah digunakan!");
            }
            return true;
        }),
        check("email", "Format email tidak valid!").isEmail(),
        check("nohp", "No HP tidak valid!").isMobilePhone("id-ID"),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("contact/add", {
                title: "Form Tambah Data Contact",
                errors: errors.array(),
            });
        } else {
            addContact(req.body);
            req.flash("msg", "Data contact berhasil ditambahkan!");
            res.redirect("/contact");
        }
    }
);

// halaman form tambah data contact
app.get("/contact/add", (req, res) => {
    res.render("contact/add", {
        title: "Form Tambah Data Contact",
    });
});

// halaman detail contact
app.get("/contact/detail/:nama", (req, res) => {
    const contact = findContact(decodeURI(req.params.nama));
    res.render("contact/detail", {
        title: "Halaman Detail Contact",
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
