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
    new: { isAccessible: canEditGallery },
    edit: { isAccessible: canEditGallery },
    delete: { isAccessible: canEditGallery },
    bulkDelete: { isAccessible: canEditGallery },
  },
};

module.exports = galleryOptions;
