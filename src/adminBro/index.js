const AdminBro = require("admin-bro");
const Contact = require("../models/contact");
const Document = require("../models/document");
const Gallery = require("../models/gallery");
const InfoModal = require("../models/infoModal");
const Post = require("../models/post");
const Team = require("../models/team");
const User = require("../models/user");
const { after, before } = require("./actions/passwordActions");

const adminBro = new AdminBro({
  resources: [
    {
      resource: User,
      options: {
        properties: {
          encryptedPassword: {
            isVisible: false,
          },
          password: {
            type: "password",
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
        actions: {
          new: {
            after: after,
            before: before,
          },
          edit: { after: after, before: before },
        },
      },
    },
    {
      resource: Team,
      options: {},
    },
    {
      resource: Post,
      options: {},
    },
    {
      resource: Contact,
      options: {},
    },
    {
      resource: Document,
      options: {},
    },
    {
      resource: Gallery,
      options: {},
    },
    {
      resource: InfoModal,
      options: {},
    },
  ],
  rootPath: "/admin",
  loginPath: "/admin/login",
  branding: {
    companyName: "Hufiec",
    softwareBrothers: false,
  },
});

module.exports = adminBro;
