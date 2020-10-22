require("dotenv").config();

const mongoose = require("mongoose");
const { server } = require("./app");

Promise.all([
    server.listen(process.env.PORT),
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    }),
])
    .then(([{ url, err }]) => {
        if (err) {
            console.error(`ERROR: ${err.message}`);
        } else {
            console.log(`🚀 Listening on port ${url}`);
        }
    })
    .catch((err) => {
        console.error(`ERROR: ${err.message}`);
    });
