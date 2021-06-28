const AdminBro = require("admin-bro");
const Contact = require("../models/contact");
const Document = require("../models/document");
const Gallery = require("../models/gallery");
const InfoModal = require("../models/infoModal");
const Post = require("../models/post");
const Team = require("../models/team");
const User = require("../models/user");
const { after, before } = require("./actions/passwordActions");

const sidebarGroups = {
  user: {
    icon: "User",
  },
  post: { icon: "Blog" },
  team: { icon: "Events" },
  infoModal: { icon: "Information" },
  gallery: { icon: "Camera" },
  document: { icon: "Document" },
  contact: { icon: "Phone" },
};

const adminBro = new AdminBro({
  resources: [
    {
      resource: User,
      options: {
        navigation: sidebarGroups.user,
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
      options: {
        navigation: sidebarGroups.team,
        properties: { description: { type: "richtext" } },
      },
    },
    {
      resource: Post,
      options: {
        navigation: sidebarGroups.post,
        properties: {
          content: { type: "richtext" },
          preview: {
            type: "richtext",
            props: {
              quill: { modules: { toolbar: [["bold"], ["blockquote"]] } },
            },
          },
        },
      },
    },
    {
      resource: Contact,
      options: { navigation: sidebarGroups.contact },
    },
    {
      resource: Document,
      options: { navigation: sidebarGroups.document },
    },
    {
      resource: Gallery,
      options: { navigation: sidebarGroups.gallery },
    },
    {
      resource: InfoModal,
      options: {
        navigation: sidebarGroups.infoModal,
        properties: {
          content: {
            type: "richtext",
            props: {
              quill: { modules: { toolbar: [["bold"], ["blockquote"]] } },
            },
          },
        },
      },
    },
  ],
  rootPath: "/admin",
  loginPath: "/admin/login",
  branding: {
    companyName: "Hufiec",
    logo: "https://ik.imagekit.io/lubien/Hufiec/hufiec_BPD8aFZUq.png",
    favicon: "https://ik.imagekit.io/lubien/Hufiec/logo_3OFbKsfcN.png",
    softwareBrothers: false,
    theme: {
      colors: {
        primary100: "#8DB23E",
        primary80: "#99c242",
        primary60: "#a5d147",
        primary40: "#b4e055",
        primary20: "#bae067",
        accent: "#a6e619",
        hoverBg: "#95cc21",
        filterBg: "#475c13",
      },
    },
  },
  dashboard: {
    component: AdminBro.bundle("./components/dashboard.jsx"),
  },
});

module.exports = adminBro;
