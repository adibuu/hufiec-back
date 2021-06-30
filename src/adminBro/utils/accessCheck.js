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
      currentAdmin.scoutTeam === record.param("_id"))
  );
};
