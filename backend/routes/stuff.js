const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/sauce");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const { route } = require("./users");

router.get("/", auth, stuffCtrl.getAllStuff);
router.post("/", auth, multer, stuffCtrl.createThing);
router.post("/:id/like", auth, multer, stuffCtrl.likeSauce);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.put("/:id", auth, multer, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);

module.exports = router;
