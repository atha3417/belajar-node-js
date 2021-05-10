const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);
    return contacts;
};

const simpanContact = (nama, email, noHP) => {
    const contact = { nama, email, noHP };
    const contacts = loadContact();

    // cek duplikat contact
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(
            chalk.white.bgRed.bold("Kontak sudah terdaftar, gunakan nama lain!")
        );
        return false;
    }

    // cek email
    if (!validator.isEmail(email)) {
        console.log(chalk.white.bgRed.bold("Format email tidak valid!"));
        return false;
    }

    // cek no hp
    if (!validator.isMobilePhone(noHP, "id-ID")) {
        console.log(chalk.white.bgRed.bold("Format no HP tidak valid!"));
        return false;
    }

    contacts.push(contact);
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 4));
    console.log(
        chalk.black.bgGreen.bold(
            `Terima kasih ${nama}, kontak anda sudah kami masukkan!`
        )
    );
};

const listContacts = () => {
    const contacts = loadContact();
    console.log(chalk.black.cyan.inverse.bold("Daftar kontak: "));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    );
    if (!contact) {
        console.log(chalk.white.bgRed.bold(`${nama} tidak ditemukan!`));
        return false;
    }

    console.log(chalk.black.cyan.inverse.bold(`Nama: ${contact.nama}`));
    console.log(`Email: ${contact.email}`);
    console.log(`No HP: ${contact.noHP}`);
};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    );

    if (contacts.length === newContacts.length) {
        console.log(chalk.white.bgRed.bold(`${nama} tidak ditemukan!`));
        return false;
    }

    fs.writeFileSync(
        "data/contacts.json",
        JSON.stringify(newContacts, null, 4)
    );
    console.log(
        chalk.black.bgGreen.bold(`data contact ${nama} berhasil dihapus!`)
    );
};

module.exports = { simpanContact, listContacts, detailContact, deleteContact };
