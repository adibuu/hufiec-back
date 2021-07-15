const AdminBro = require("admin-bro");
const Contact = require("../models/contact");
const Document = require("../models/document");
const Gallery = require("../models/gallery");
const InfoModal = require("../models/infoModal");
const Post = require("../models/post");
const Team = require("../models/team");
const User = require("../models/user");
const userOptions = require("./resourceOptions/user");
const teamOptions = require("./resourceOptions/team");
const postOptions = require("./resourceOptions/post");
const contactOptions = require("./resourceOptions/contact");
const documentOptions = require("./resourceOptions/document");
const galleryOptions = require("./resourceOptions/gallery");
const infoModalOptions = require("./resourceOptions/infoModal");
const branding = require("./config/branding");
const i18nOptions = require("./config/i18nOptions");

const adminBro = new AdminBro({
  resources: [
    {
      resource: User,
      options: userOptions,
    },
    {
      resource: Team,
      options: teamOptions,
    },
    {
      resource: Post,
      options: postOptions,
    },
    {
      resource: Contact,
      options: contactOptions,
    },
    {
      resource: Document,
      options: documentOptions,
    },
    {
      resource: Gallery,
      options: galleryOptions,
    },
    {
      resource: InfoModal,
      options: infoModalOptions,
    },
  ],
  rootPath: "/admin",
  loginPath: "/admin/login",
  branding: branding,
  dashboard: {
    component: AdminBro.bundle("./components/dashboard.jsx"),
  },
  pages: {
    approveArticlesPage: {
      label: "Test Page",
      component: AdminBro.bundle("./components/approveArticles.jsx"),
    },
  },
  locale: i18nOptions,
});

module.exports = adminBro;
