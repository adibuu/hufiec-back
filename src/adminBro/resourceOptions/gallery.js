const { canEditGallery } = require("../utils/accessCheck");
const sidebarGroups = require("../config/sidebarGroups");

const galleryOptions = {
  navigation: sidebarGroups.gallery,
  properties: {
    _id: {
      isVisible: {
        list: false,
      },
    },
  },
  actions: {
    list: { isAccessible: canEditGallery },
    show: { isAccessible: canEditGallery },
    new: { isAccessible: false },
    edit: { isAccessible: canEditGallery },
    delete: { isAccessible: false },
    bulkDelete: { isAccessible: false },
  },
};

module.exports = galleryOptions;
