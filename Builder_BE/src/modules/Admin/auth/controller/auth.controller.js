/* ====================================
            Imports
   ==================================== */
const db = require("../../../../config/index");
const { passwordEncryption } = require("../../../../utils/passwordEncryption");
const { sendMail } = require("../../../../utils/mailer");
const { generateOtp } = require("../../../../utils/otpGenerator");
const UsersModel = db.UsersModel;
const OtpsModel = db.OtpsModel;

/* ====================================
            Controllers
   ==================================== */
exports.user_registration = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!name || !normalizedEmail || !password) {
      return res.badRequest("Name, email and password are required");
    }

    const isExist = await UsersModel.findOne({
      where: { email: normalizedEmail, is_deleted: false },
    });

    if (isExist) {
      return res.conflict("User already exists with this email");
    }

    let otp = generateOtp();

    const hashedPassword = await passwordEncryption(password);
    const user = await UsersModel.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      is_verified: false,
    });

    const saveOtp = await OtpsModel.create({
      user_id: user.id,
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendMail(email, "OTP Verification", `Your OTP is ${otp}`);

    return res.ok("OTP sent successfully", otp);
  } catch (error) {
    next(error);
  }
};

exports.verify_otp = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!name || !normalizedEmail || !password) {
      return res.badRequest("Name, email and password are required");
    }

    const isExist = await UsersModel.findOne({
      where: { email: normalizedEmail, is_deleted: false },
    });

    if (isExist) {
      return res.conflict("User already exists with this email");
    }

    const hashedPassword = await passwordEncryption(password);
    const user = await UsersModel.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    const userData = user.toJSON();
    delete userData.password;

    return res.created("User created successfully", userData);
  } catch (error) {
    next(error);
  }
};
