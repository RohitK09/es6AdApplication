 import mongoose from "mongoose";
 mongoose.connect("mongodb://localhost/kargodb");
 let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback() {
   console.log('Connected to DB');
});

module.exports = db;