const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      // attributes: ['id','username','email','no_hp','role']
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params; // Assuming ID is used to find the user

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getProfile = async (req, res) => {
  const id = req.id;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

const createUser = async (req, res) => {
  const { name, email, phone, password, confPassword, role, alamat } = req.body;
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
      alamat: alamat,
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

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password, confPassword, role, alamat } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (password && password !== confPassword) {
      return res.status(400).json({
        message: "password doesn't match",
      });
    }

    const updatedData = {
      name: name || user.name,
      email: email || user.email,
      phone: phone || user.phone,
      role: role || user.role,
      alamat: alamat || user.alamat,
    };

    if (password) {
      const salt = await bcrypt.genSalt();
      updatedData.password = await bcrypt.hash(password, salt);
    }

    await user.update(updatedData);

    return res.status(200).json({
      data: user,
      message: "success update data",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.destroy();

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser, getProfile };
