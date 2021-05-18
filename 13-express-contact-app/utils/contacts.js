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

// hapus contact
const deleteContact = (nama) => {
    const contacts = loadContacts();
    const filteredContacts = contacts.filter(
        (contact) => contact.nama !== nama
    );
    savesContact(filteredContacts);
};

// mengubah contacts
const updateContacts = (contactBaru) => {
    const contacts = loadContacts();
    // hilangkan contact lama yang namanya sama dengan oldNama
    const filteredContacts = contacts.filter(
        (contact) => contact.nama !== contactBaru.oldNama
    );
    delete contactBaru.oldNama;
    filteredContacts.push(contactBaru);
    savesContact(filteredContacts);
};

module.exports = {
    loadContacts,
    findContact,
    addContact,
    cekDuplikat,
    deleteContact,
    updateContacts,
};
