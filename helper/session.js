const session = require("express-session");
const MongodbSession = require("connect-mongodb-session")(session);

module.exports = function setSession(app) {
    const store = new MongodbSession({
        // uri: "mongodb://localhost/sessions",
        uri: "mongodb+srv://ahpatel9:ahpatel9@cluster0.ar3og.mongodb.net/Needy?retryWrites=true&w=majority",
        // collection: "mysessions",
        collection: "Needy",
    });
    app.use(
        session({
            secret: "key that will sign cookie",
            resave: false,
            saveUninitialized: false,
            store: store,
            cookie: {
                expires: new Date(253402300000000),
                httpOnly: true
            },
        })
    );
};