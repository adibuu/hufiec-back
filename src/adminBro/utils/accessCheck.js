exports.isAdmin = ({ currentAdmin }) =>
  currentAdmin && currentAdmin.role === "admin";

exports.canEditPost = ({ currentAdmin, record }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "admin" ||
      currentAdmin._id === record.param("author"))
  );
};

exports.canEditTeam = ({ currentAdmin, record }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "admin" ||
      (currentAdmin.scoutTeam === record.param("_id") &&
        currentAdmin.editingPermissions.team === true))
  );
};

exports.canEditContact = ({ currentAdmin }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "admin" ||
      currentAdmin.editingPermissions.contact === true)
  );
};

exports.canEditDocument = ({ currentAdmin }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "admin" ||
      currentAdmin.editingPermissions.document === true)
  );
};

exports.canEditGallery = ({ currentAdmin }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "admin" ||
      currentAdmin.editingPermissions.gallery === true)
  );
};

exports.canEditInfoModal = ({ currentAdmin }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "admin" ||
      currentAdmin.editingPermissions.infoModal === true)
  );
};
