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
    new: { isAccessible: false },
    edit: { isAccessible: canEditInfoModal },
    delete: { isAccessible: false },
    bulkDelete: { isAccessible: false },
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
