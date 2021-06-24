const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/sauce");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


router.get("/", auth, stuffCtrl.getAllSauce);
router.post("/", auth, multer, stuffCtrl.createSauce);
router.post("/:id/like", auth, multer, stuffCtrl.likeSauce);
router.get("/:id", auth, stuffCtrl.getOneSauce);
router.put("/:id", auth, multer, stuffCtrl.modifySauce);
router.delete("/:id", auth, stuffCtrl.deleteSauce);

module.exports = router;
