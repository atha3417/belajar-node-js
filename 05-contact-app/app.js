const yargs = require("yargs");
const { simpanContact } = require("./contacts");

yargs.command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
        nama: {
            describe: "Nama lengkap",
            demandOption: true,
            type: "string",
        },
        email: {
            describe: "Alamat email",
            demandOption: true,
            type: "string",
        },
        noHP: {
            describe: "Nomor handphone",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        simpanContact(argv.nama, argv.email, argv.noHP);
    },
});

yargs.parse();
