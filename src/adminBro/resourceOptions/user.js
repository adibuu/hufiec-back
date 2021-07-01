const { after, before } = require("../actions/passwordActions");
const { isAdmin } = require("../utils/accessCheck");
const sidebarGroups = require("../config/sidebarGroups");

const userOptions = {
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
};

module.exports = userOptions;
