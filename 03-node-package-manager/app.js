var validator = require("validator");
var chalk = require("chalk");

// console.log(validator.isEmail("atha.3417@gmail.com"));
// console.log(validator.isMobilePhone("0898876564", "id-ID"));
// console.log(validator.isNumeric("0898876564"));

// console.log(chalk.italic.bgBlue.black("Hello World!"));
const nama = "Atha";
const pesan = chalk`Lorem ipsum dolor, {bgRed.black sit amet} consectetur {bgGreen.bold.black adipisicing} elit. Repudiandae, quam? Nama saya ${nama}`;
console.log(pesan);
