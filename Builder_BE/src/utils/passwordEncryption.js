const bycrpt = require("bcrypt");

module.exports.passwordEncryption = async (password) => {
  if (!password) return;

  let hashedPassword;
  hashedPassword = await bycrpt.hash(password, 12);

  return hashedPassword;
};
