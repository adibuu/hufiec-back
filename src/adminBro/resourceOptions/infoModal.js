const { canEditInfoModal } = require("../utils/accessCheck");
const sidebarGroups = require("../config/sidebarGroups");

const infoModalOptions = {
  navigation: sidebarGroups.infoModal,
  properties: {
    _id: {
      isVisible: {
        list: false,
      },
    },
  },
  actions: {
    list: { isAccessible: canEditInfoModal },
    show: { isAccessible: canEditInfoModal },
    new: { isAccessible: canEditInfoModal },
    edit: { isAccessible: canEditInfoModal },
    delete: { isAccessible: canEditInfoModal },
    bulkDelete: { isAccessible: canEditInfoModal },
  },
  properties: {
    content: {
      type: "richtext",
      props: {
        quill: { modules: { toolbar: [["bold"], ["blockquote"]] } },
      },
    },
  },
};

module.exports = infoModalOptions;
