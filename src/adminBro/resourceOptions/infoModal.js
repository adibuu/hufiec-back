const { canEditInfoModal } = require("../utils/accessCheck");
const sidebarGroups = require("../config/sidebarGroups");

const infoModalOptions = {
  navigation: sidebarGroups.infoModal,
  properties: {
    _id: {
      isVisible: {
        list: false,
        edit: false,
        filter: false,
        show: false,
      },
    },
    content: {
      type: "richtext",
      props: {
        quill: { modules: { toolbar: [["bold"], ["blockquote"]] } },
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
};

module.exports = infoModalOptions;
