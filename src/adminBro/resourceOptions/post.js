const { canEditPost } = require("../utils/accessCheck");
const sidebarGroups = require("../config/sidebarGroups");

const postOptions = {
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
    imageURL: {
      isVisible: {
        edit: true,
        show: true,
        list: false,
        filter: true,
      },
    },
    filesURL: {
      isVisible: {
        edit: true,
        show: true,
        list: false,
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
        list: true,
        show: true,
        filter: true,
        edit: true,
        new: true,
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
};

module.exports = postOptions;
