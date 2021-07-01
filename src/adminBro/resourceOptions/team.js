const { canEditTeam, isAdmin } = require("../utils/accessCheck");
const sidebarGroups = require("../config/sidebarGroups");

const teamOptions = {
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
};

module.exports = teamOptions;
