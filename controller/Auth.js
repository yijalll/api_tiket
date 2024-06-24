const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken")

const Register = async (req, res) => {
  const { name, email, phone, password, confPassword, role } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({
      message: "password doesn't match",
    });
  }

  const existingUser = await User.findOne({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return res.status(400).json({
      message: "email has been registered",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {        
    const newUser = await User.create({
      name: name,
      email: email,
      phone: phone,
      password: hashPassword,
      role: role || "user", // Default to "user" if no role is provided
    });
    return res.status(201).json({
      data: newUser,
      message: "success register data",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email",
      });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    const payload = {
      id : user.id,
      email : user.email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    }); //set token with expires 2 hours

    res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const Logout = async (req, res) => {
  // Remove refreshToken logic as it's not needed
  return res.sendStatus(200);
};

module.exports = { Register, Login, Logout };
