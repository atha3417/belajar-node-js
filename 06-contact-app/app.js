const yargs = require("yargs");
const {
    simpanContact,
    listContacts,
    detailContact,
    deleteContact,
} = require("./contacts");

// menambahkan contact
yargs
    .command({
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
    })
    .demandCommand();

// menampilkan daftar semua nama & no hp contact
yargs.command({
    command: "list",
    describe: "Menampilkan semua nama dan no HP contact",
    handler(argv) {
        listContacts();
    },
});

// menampilkan detail sebuah contact
yargs.command({
    command: "detail",
    describe: "Menampilkan detail sebuah contact berdasarkan nama",
    builder: {
        nama: {
            describe: "Nama lengkap",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        detailContact(argv.nama);
    },
});

// menghapus contact berdasarkan nama
yargs.command({
    command: "delete",
    describe: "Menghapus sebuah contact berdasarkan nama",
    builder: {
        nama: {
            describe: "Nama lengkap",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        deleteContact(argv.nama);
    },
});

yargs.parse();
