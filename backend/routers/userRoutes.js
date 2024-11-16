const fs = require('fs');
const path = require('path');
const express = require("express");
const multer = require("multer");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  postCourseController,
  getAllCoursesUserController,
  deleteCourseController,
  getAllCoursesController,
  enrolledCourseController,
  sendCourseContentController,
  completeSectionController,
  sendAllCoursesUserController,
} = require("../controllers/userControllers");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Setup Multer upload
const upload = multer({ storage });

router.post("/register", registerController);
router.post("/login", loginController);

router.post(
  "/addcourse",
  authMiddleware,
  upload.fields([
    { name: "S_content", maxCount: 1 },
    { name: "S_title", maxCount: 100 },
    { name: "S_description", maxCount: 100 },
  ]),
  postCourseController
);

router.get('/getallcourses', getAllCoursesController);
router.get('/getallcoursesteacher', authMiddleware, getAllCoursesUserController);
router.delete('/deletecourse/:courseid', authMiddleware, deleteCourseController);
router.post('/enrolledcourse/:courseid', authMiddleware, enrolledCourseController);
router.get('/coursecontent/:courseid', authMiddleware, sendCourseContentController);
router.post('/completemodule', authMiddleware, completeSectionController);
router.get('/getallcoursesuser', authMiddleware, sendAllCoursesUserController);

module.exports = router;