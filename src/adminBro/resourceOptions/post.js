const Post = require("../../models/post");
const AdminBro = require("admin-bro");
const { NotFoundError } = require("admin-bro");
const { canEditPost, isAdmin } = require("../utils/accessCheck");
const sidebarGroups = require("../config/sidebarGroups");

const postOptions = {
  navigation: sidebarGroups.post,
  sort: {
    sortBy: "expireAt",
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
    _id: {
      isVisible: {
        list: false,
      },
    },
    expireAt: {
      isVisible: {
        list: true,
        show: true,
        filter: true,
        edit: false,
        new: false,
      },
    },
    show: {
      isVisible: {
        list: true,
        show: true,
        filter: true,
        edit: false,
        new: false,
      },
    },
    content: {
      type: "richtext",
      isVisible: {
        list: false,
        show: true,
        filter: true,
        edit: true,
        new: true,
      },
    },
    preview: {
      type: "richtext",
      isVisible: {
        list: false,
        show: true,
        filter: true,
        edit: true,
        new: true,
      },
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
        let show;
        if (currentAdmin.editingPermissions.postsMustBeApprovedByAdmin) {
          show = false;
        } else {
          show = true;
        }
        request.payload = {
          ...request.payload,
          author: currentAdmin._id,
          show: show,
        };
        return request;
      },
    },
    public: {
      isAccessible: isAdmin,
      isVisible: (context) => context.record.param("show") === false,
      icon: "View",
      actionType: "record",
      handler: async (request, response, context) => {
        const post = await Post.findById(context.record.param("_id"))
          .populate("author email")
          .exec();
        if (!post) {
          throw new NotFoundError("", "Can't find this post");
        }
        const p = context.record;
        post.show = true;
        await post.save();
        return {
          record: p.toJSON(context.currentAdmin),
        };
      },
      component: AdminBro.bundle("../components/public.jsx"),
    },
  },
};

module.exports = postOptions;
