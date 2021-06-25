const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const { body, validationResult, check } = require("express-validator");

require("./utils/db");
const Contact = require("./model/contact");
const { titleCase } = require("./utils/functions");

const app = express();
const port = 3000;

// Setup EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Setup Method Override
app.use(methodOverride("_method"));

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
        url: "home",
        mahasiswa,
    });
});

// Halaman About
app.get("/about", (req, res) => {
    res.render("about", {
        title: "Halaman About",
        url: "about",
    });
});

// Halaman Contact
app.get("/contact", async (req, res) => {
    const contacts = await Contact.find();
    res.render("contact/index", {
        title: "Halaman Contact",
        url: "contact",
        contacts,
        msg: req.flash("msg"),
        titleCase,
    });
});

// Halaman Form Tambah Data Contact
app.get("/contact/add", (req, res) => {
    const msg = {
        nama: "",
        email: "",
        nohp: "",
    };
    res.render("contact/add", {
        title: "Form Tambah Data Contact",
        url: "contact",
        msg,
    });
});

// Proses Tambah Data Contact
app.post(
    "/contact",
    [
        body("nama").custom(async (value) => {
            const duplikat = await Contact.findOne({
                nama: value.toLowerCase(),
            });
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
                url: "contact",
                errors: errors.array(),
                msg: req.body,
            });
        } else {
            req.body.nama = req.body.nama.toLowerCase();
            Contact.insertMany(req.body, (error, result) => {
                req.flash("msg", "Data contact berhasil ditambahkan!");
                res.redirect("/contact");
            });
        }
    }
);

// Proses Hapus Contact
app.delete("/contact", async (req, res) => {
    Contact.deleteOne({ nama: req.body.nama }).then((error, result) => {
        req.flash("msg", "Data contact berhasil dihapus!");
        res.redirect("/contact");
    });
});

// Form Ubah Data Contact
app.get("/contact/edit/:nama", async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });
    res.render("contact/edit", {
        title: "Form Ubah Data Contact",
        url: "contact",
        contact,
    });
});

// Proses Ubah Data
app.put(
    "/contact",
    [
        body("nama").custom(async (value, { req }) => {
            const duplikat = await Contact.findOne({ nama: value });
            if (value !== req.body.oldNama && duplikat) {
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
            res.render("contact/edit", {
                title: "Form Ubah Data Contact",
                url: "contact",
                errors: errors.array(),
                contact: req.body,
            });
        } else {
            Contact.updateOne(
                { _id: req.body._id },
                {
                    $set: {
                        nama: req.body.nama,
                        email: req.body.email,
                        nohp: req.body.nohp,
                    },
                }
            ).then((error, result) => {
                req.flash("msg", "Data contact berhasil diubah!");
                res.redirect("/contact");
            });
        }
    }
);

// Halaman Detail Contact
app.get("/contact/:nama", async (req, res) => {
    const contact = await Contact.findOne({
        nama: decodeURI(req.params.nama.toLowerCase()),
    });
    res.render("contact/detail", {
        title: "Halaman Detail Contact",
        url: "contact",
        contact,
        titleCase,
    });
});

app.listen(port, () => {
    console.log(`Mongo contact app | Listening at http://localhost:${port}`);
});
