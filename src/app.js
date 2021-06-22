const path = require("path");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("./db/db-connection");
const { limiter } = require("./config/rateLimits");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const MongoStore = require("connect-mongo");
const User = require("./models/user");

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = require("./adminBro");

const routerAdminBro = AdminBroExpress.buildAuthenticatedRouter(
  adminBro,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email });
      if (user) {
        const matched = await bcrypt.compare(password, user.encryptedPassword);
        if (matched) {
          return user;
        }
      }
      return false;
    },
    cookiePassword: process.env.COOKIE_PASSWORD,
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.ATLAS_URI,
      ttl: 1 * 9 * 60 * 60,
    }),
  }
);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(adminBro.options.rootPath, routerAdminBro);
app.use(helmet());
app.use(cors());
app.use(limiter);

app.listen(PORT, () => console.log("Server is running on " + PORT));
