/* ====================================
            Imports
   ==================================== */
const db = require("../../../../config/index");
const {
  dataEncryption,
  encryptionCompare,
} = require("../../../../utils/dataEncryption");
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

    const hashedPassword = await dataEncryption(password);
    const hashedOtp = await dataEncryption(otp);

    const user = await UsersModel.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      is_verified: false,
    });

    const saveOtp = await OtpsModel.create({
      user_id: user.id,
      otp: hashedOtp,
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
    const { email, otp } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !otp) {
      return res.badRequest("Email and Otp are required");
    }

    const isExist = await UsersModel.findOne({
      where: { email: normalizedEmail, is_verified: false, is_deleted: false },
      include: [
        {
          model: OtpsModel,
          as: "otp",
          order: [["created_at", "DESC"]],
          limit: 1,
        },
      ],
    });

    if (!isExist) {
      return res.notFound("User not found");
    }

    const otpRecord = isExist?.otp[0];

    if (!otpRecord) {
      return res.error("OTP not found");
    }

    // Check Expiry
    if (new Date() > new Date(otpRecord.otpExpiry)) {
      return res.notFound("Otp expired");
    }

    const compareOtp = await encryptionCompare(otp, otpRecord.otp);

    if (!compareOtp) {
      return res.notFound("Invalid Otp");
    }

    await UsersModel.update(
      { is_verified: true },
      { where: { id: isExist?.id } },
    );
    await OtpsModel.destroy({ where: { user_id: isExist?.id } });

    const userData = await UsersModel.findByPk(isExist?.id);

    const formattedData = userData?.toJSON();
    delete formattedData.password;

    return res.ok("Otp verified successfully", formattedData);
  } catch (error) {
    next(error);
  }
};
