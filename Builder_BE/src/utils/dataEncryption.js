const bycrpt = require("bcrypt");

module.exports.dataEncryption = async (data) => {
  if (!data) return;

  let hashedData;
  hashedData = await bycrpt.hash(data, 12);

  return hashedData;
};

module.exports.encryptionCompare = async (data, encryptedData) => {
  if (!data || !encryptedData) return;

  return await bycrpt.compare(data, encryptedData);
};
