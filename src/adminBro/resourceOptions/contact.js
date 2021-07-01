const { canEditContact } = require("../utils/accessCheck");
const sidebarGroups = require("../config/sidebarGroups");

const contactOptions = {
  navigation: sidebarGroups.contact,
  properties: {
    _id: {
      isVisible: {
        list: false,
      },
    },
  },
  actions: {
    list: { isAccessible: canEditContact },
    show: { isAccessible: canEditContact },
    new: { isAccessible: canEditContact },
    edit: { isAccessible: canEditContact },
    delete: { isAccessible: canEditContact },
    bulkDelete: { isAccessible: canEditContact },
  },
};

module.exports = contactOptions;
