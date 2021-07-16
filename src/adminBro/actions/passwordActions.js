const { ValidationError } = require("admin-bro");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../../models/user");

const after = async (response) => {
  if (response.record && response.record.errors) {
    response.record.errors.password = response.record.errors.encryptedPassword;
  }
  return response;
};
const before = async (request) => {
  if (request.payload.password) {
    if (!validator.isEmail(request.payload.email)) {
      throw new ValidationError({
        email: {
          message: "Błędny email",
        },
      });
    }
    if (!validator.isStrongPassword(request.payload.password)) {
      throw new ValidationError({
        password: {
          message:
            "Hasło musi zawierać co najmniej osiem znaków, co najmniej jedną wielką literę, jedną małą literę, jedną cyfrę i jeden znak specjalny.",
        },
      });
    }
    const emailExists = await User.findOne({ email: request.payload.email });
    if (emailExists) {
      throw new ValidationError({
        email: {
          message: "Ten email jest już zajęty",
        },
      });
    }
    if (request.payload.role === "admin") {
      request.payload = {
        ...request.payload,
        editingPermissions: {
          postsMustBeApprovedByAdmin: false,
          team: true,
          contact: true,
          document: true,
          gallery: true,
          infoModal: true,
        },
      };
    }
    request.payload = {
      ...request.payload,
      encryptedPassword: await bcrypt.hash(request.payload.password, 12),
      password: undefined,
    };
  }
  return request;
};

module.exports = { after, before };
