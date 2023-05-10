const mongoose = require('mongoose');
const uri = process.env.URI;
mongoose.connect(uri, {}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection: ' + err);
  }
});

module.exports = mongoose;
