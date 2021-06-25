const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mongo-contact-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// // Menambah 1 data
// const contact1 = new Contact({
//     nama: "Nafisa Zahra",
//     nohp: "082181268164",
//     email: "nafisa.2306@gmail.com",
// });
// contact1.save().then((contact) => console.log(contact));
