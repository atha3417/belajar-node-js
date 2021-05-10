// Core module

// File system
const fs = require("fs");

// menuliskan string ke file secara synchronous
// try {
//     fs.writeFileSync("data/test.txt", "Hello World secara synchronous!");
// } catch (e) {
//     console.log(e);
// }

// menuliskan string ke file secara asynchronous
// fs.writeFile("data/test.txt", "Hello World secara asynchronous!", (e) =>
//     console.log(e)
// );

// membaca isi file (synchronous)
// const data = fs.readFileSync("data/test.txt", "utf-8");
// // console.log(data.toString());
// console.log(data);

// membaca isi file (asynchronous)
// fs.readFile("data/test.txt", "utf-8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// Readline
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Masukkan nama anda: ", (nama) => {
    rl.question("Masukkan no HP anda: ", (noHP) => {
        console.log(`Terima kasih ${nama}, sudah menginputkan ${noHP}`);
        rl.close();
        const contact = { nama, noHP };
        file = fs.readFileSync("data/contact.json", "utf-8");
        const contacts = JSON.parse(file);

        contacts.push(contact);
        // console.log(contacts);
        fs.writeFileSync(
            "data/contact.json",
            JSON.stringify(contacts, null, 4)
        );
    });
});
