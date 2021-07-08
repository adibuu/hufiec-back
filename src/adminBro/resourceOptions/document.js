const { canEditDocument } = require("../utils/accessCheck");
const sidebarGroups = require("../config/sidebarGroups");

const documentOptions = {
  navigation: sidebarGroups.document,
  properties: {
    _id: {
      isVisible: {
        list: false,
      },
    },
  },
  actions: {
    list: { isAccessible: canEditDocument },
    show: { isAccessible: canEditDocument },
    new: { isAccessible: false },
    edit: { isAccessible: canEditDocument },
    delete: { isAccessible: false },
    bulkDelete: { isAccessible: false },
  },
};

module.exports = documentOptions;
