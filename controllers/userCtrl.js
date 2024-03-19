const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const projectModel=require('../models/projectModel');
//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

const addProjectController = async (req, res) => {
  // try {
  //   const newProject = await projectModel.create({ ...req.body, status: 'pending' });

  //   // Find user
  //   const user = await userModel.findOne({ isAdmin: true });

  //   if (user) {
  //     // Send email notification to the user
  //     const notification = user.notification || [];
  //     notification.push({
  //       type: 'addproject-request',
  //       message: 'Project added by admin'
  //     });

  //     await userModel.findByIdAndUpdate(user._id, { notification });

  //     return res.status(201).send({
  //       success: true,
  //       message: 'Project added successfully'
  //     });
  //   }

  //   return res.status(404).send({
  //     success: false,
  //     message: 'Admin not found'
  //   });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).send({
  //     success: false,
  //     message: 'Error while adding project'
  //   });
  // }
  console.log(req.body);
  const projectdata = req.body;
  console.log("hello this is project data"+projectdata)
  await projectModel.create(projectdata)
  .then((response) => {
    console.log("data added");
  }).catch((error) => {
    console.log(error);
  });
};
const viewprojects = async(req, res) => {

  await projectModel.find()
  .then((result) => {
    console.log(result);
    res.status(200).send(result);
  }).catch((error) => {
    console.log(error);
  })
 
}

//module.exports = addProjectController;


module.exports = { loginController, registerController, authController ,addProjectController,viewprojects};


