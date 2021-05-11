const fs = require("fs");

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

// ambil semua data di contact.json
const loadContacts = () => {
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);
    return contacts;
};

// cari contact berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContacts();

    const contact = contacts.find((contact) => contact.nama === nama);
    return contact;
};

// menuliskan / menimpa file contacts.json dengan data yang baru
const savesContact = (contacts) => {
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// menambahkan data contact baru
const addContact = (contact) => {
    const contacts = loadContacts();
    contacts.push(contact);
    savesContact(contacts);
};

// cek nama duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContacts();
    return contacts.find((contact) => contact.nama === nama);
};

module.exports = { loadContacts, findContact, addContact, cekDuplikat };
