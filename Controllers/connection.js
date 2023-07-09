require('dotenv').config()
const { MONGODB_URL } = process.env
const mongoose = require("mongoose")
mongoose
.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB is  connected successfully"))
.catch((err) => console.error(err));

mongoose.connection

    .on('open', () => console.log('you are connected'))
    .on('close', () => console.log('you are disconnected'))
    .on('error', (error) => console.log(error))

module.exports = mongoose