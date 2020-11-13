const mongoose = require('mongoose');

dbConnect = mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  //.then((result) => app.listen(3000))
  .then((result) => console.log("Connected to db"))
  .catch((err) => console.log(err));


module.exports = dbConnect