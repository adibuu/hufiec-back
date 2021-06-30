const AdminBro = require("admin-bro");
const Contact = require("../models/contact");
const Document = require("../models/document");
const Gallery = require("../models/gallery");
const InfoModal = require("../models/infoModal");
const Post = require("../models/post");
const Team = require("../models/team");
const User = require("../models/user");
const { after, before } = require("./actions/passwordActions");
const { isAdmin, canEditPost, canEditTeam } = require("./utils/accessCheck");

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
        listProperties: ["email", "role", "scoutTeam"],
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
          _id: {
            isVisible: {
              list: false,
            },
          },
        },
        actions: {
          new: {
            after: after,
            before: before,
            isAccessible: isAdmin,
          },
          edit: { after: after, before: before, isAccessible: isAdmin },
          list: { isAccessible: isAdmin },
          search: { isAccessible: isAdmin },
          show: { isAccessible: isAdmin },
          delete: { isAccessible: isAdmin },
          bulkDelete: { isAccessible: isAdmin },
        },
      },
    },
    {
      resource: Team,
      options: {
        navigation: sidebarGroups.team,
        properties: {
          description: { type: "richtext" },
          _id: {
            isVisible: {
              list: false,
            },
          },
        },
        actions: {
          new: { isAccessible: isAdmin },
          edit: { isAccessible: canEditTeam },
          delete: { isAccessible: isAdmin },
          bulkDelete: { isAccessible: isAdmin },
        },
      },
    },
    {
      resource: Post,
      options: {
        navigation: sidebarGroups.post,
        sort: {
          sortBy: "createdAt",
          direction: "desc",
        },
        properties: {
          author: {
            isVisible: {
              edit: false,
              show: true,
              list: true,
              filter: true,
            },
          },
          _id: {
            isVisible: {
              list: false,
            },
          },
          createdAt: {
            isVisible: {
              list: false,
              show: false,
              filter: true,
              edit: false,
              new: false,
            },
          },
          updatedAt: {
            isVisible: {
              list: false,
              show: false,
              filter: true,
              edit: false,
              new: false,
            },
          },
          content: { type: "richtext" },
          preview: {
            type: "richtext",
            props: {
              quill: { modules: { toolbar: [["bold"], ["blockquote"]] } },
            },
          },
        },
        actions: {
          edit: { isAccessible: canEditPost },
          delete: { isAccessible: canEditPost },
          bulkDelete: { isAccessible: canEditPost },
          new: {
            before: async (request, { currentAdmin }) => {
              request.payload = {
                ...request.payload,
                author: currentAdmin._id,
              };
              return request;
            },
          },
        },
      },
    },
    {
      resource: Contact,
      options: {
        navigation: sidebarGroups.contact,
        properties: {
          _id: {
            isVisible: {
              list: false,
            },
          },
        },
        actions: {
          list: { isAccessible: isAdmin },
          show: { isAccessible: isAdmin },
          new: { isAccessible: isAdmin },
          edit: { isAccessible: isAdmin },
          delete: { isAccessible: isAdmin },
          bulkDelete: { isAccessible: isAdmin },
        },
      },
    },
    {
      resource: Document,
      options: {
        navigation: sidebarGroups.document,
        properties: {
          _id: {
            isVisible: {
              list: false,
            },
          },
        },
        actions: {
          list: { isAccessible: isAdmin },
          show: { isAccessible: isAdmin },
          new: { isAccessible: isAdmin },
          edit: { isAccessible: isAdmin },
          delete: { isAccessible: isAdmin },
          bulkDelete: { isAccessible: isAdmin },
        },
      },
    },
    {
      resource: Gallery,
      options: {
        navigation: sidebarGroups.gallery,
        properties: {
          _id: {
            isVisible: {
              list: false,
            },
          },
        },
        actions: {
          list: { isAccessible: isAdmin },
          show: { isAccessible: isAdmin },
          new: { isAccessible: isAdmin },
          edit: { isAccessible: isAdmin },
          delete: { isAccessible: isAdmin },
          bulkDelete: { isAccessible: isAdmin },
        },
      },
    },
    {
      resource: InfoModal,
      options: {
        navigation: sidebarGroups.infoModal,
        properties: {
          _id: {
            isVisible: {
              list: false,
            },
          },
        },
        actions: {
          list: { isAccessible: isAdmin },
          show: { isAccessible: isAdmin },
          new: { isAccessible: isAdmin },
          edit: { isAccessible: isAdmin },
          delete: { isAccessible: isAdmin },
          bulkDelete: { isAccessible: isAdmin },
        },
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
