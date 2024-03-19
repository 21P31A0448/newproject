const express = require("express");
const {
  loginController,
  registerController,
  authController,
  addProjectController,
  viewController,
  viewprojects
  
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Addproject || POST
router.post("/getUserData", authMiddleware, authController);

router.post("/addproject", addProjectController);



router.get("/viewprojects", viewprojects);


module.exports = router;
