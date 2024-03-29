const mongoose = require("mongoose");

let dbURI = 'mongodb://localhost/sistem';
if (process.env.NODE_ENV === 'production')
    dbURI = process.env.MONGODB_CLOUD_URI;
else if (process.env.NODE_ENV === 'docker')
    dbURI = 'mongodb://sistem-mongodb/sistem';
mongoose.connect(dbURI);

mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected at ${dbURI}.`);
});

mongoose.connection.on("error", (napaka) => {
    console.log("Mongoose error connecting: ", napaka);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose not connected.");
});

const pravilnaUstavitev = (sporocilo, povratniKlic) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose closed connection '${sporocilo}'.`);
        povratniKlic();
    });
};

process.once("SIGUSR2", () => {
    pravilnaUstavitev("Nodemon restart", () => {
        process.kill(process.pid, "SIGUSR2");
    });
});

process.on("SIGINT", () => {
    pravilnaUstavitev("App exited", () => {
        process.exit(0);
    });
});