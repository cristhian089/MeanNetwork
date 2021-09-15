const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
const Upload = require("../middleware/file");
const multiparty = require("connect-multiparty");
const mult = multiparty();

router.post("/registerPost", Auth, ValidateUser, PostController.savePost);
router.get("/listPost", Auth, ValidateUser, PostController.listPost);
router.post(
  "/savePostImg",
  mult,
  Upload,
  Auth,
  ValidateUser,
  PostController.savePostImg
);
router.put("/updatePost", Auth, ValidateUser, PostController.updatePost);
router.delete(
  "/deletePost/:_id",
  Auth,
  ValidateUser,
  PostController.deletePost
);

module.exports = router;
