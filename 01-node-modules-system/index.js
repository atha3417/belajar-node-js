// const nama = "Atha Tsaqif";
// const cetakNama = (nama) => `Hi nama saya ${nama}`;
// console.log(cetakNama("Atha tsaqif"));

// const fs = require("fs"); // core module
// const cetakNama = require("./coba"); // local module
// const moment = require("moment"); // third_party_module / npm module / node_modules

// console.log("Hello WPU");

const coba = require("./coba");

console.log(
    coba.cetakNama("Atha"),
    coba.PI,
    coba.mahasiswa.cetakMhs(),
    new coba.Orang()
);
