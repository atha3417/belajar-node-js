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

const simpanContact = (nama, email, noHP) => {
    const contact = { nama, email, noHP };
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);

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
        chalk`{black.bgGreen.bold Terima kasih ${nama}, kontak anda sudah kami masukkan}`
    );
};

module.exports = { simpanContact };
