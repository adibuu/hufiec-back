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
    handler: async () => {
      let postsToAccept = true;
      let activeModal = true;
      const posts = await Post.find({ show: false });
      if (posts.length === 0) {
        postsToAccept = false;
      }
      const modal = await InfoModal.find({ show: true });
      if (modal.length === 0) {
        activeModal = false;
      }
      return {
        isPostsToAccept: postsToAccept,
        postsToAcceptURL: process.env.ADMINBRO_CLIENT_URI,
        isInfoModalActive: activeModal,
      };
    },
    component: AdminBro.bundle("./components/dashboard.jsx"),
  },
  locale: i18nOptions,
  pages: {
    Generator_Rozkazów: {
      label: "Generator rozkazów",
      component: AdminBro.bundle("./components/orderGenerator.jsx"),
    },
  },
});

module.exports = adminBro;
