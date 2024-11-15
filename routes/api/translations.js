const express = require("express");
const router = express.Router();
const translationCtrl = require("../../controllers/api/translations");
const firebaseAdmin = require("../../config/firebaseAdmin");
const verifyFirebaseToken = require("../../config/auth");

router.get("/:id", verifyFirebaseToken, translationCtrl.getDayTranslations);
router.get("/official/:id", translationCtrl.getOfficialTranslations);
router.post("/", verifyFirebaseToken, translationCtrl.create);
router.put("/:id", verifyFirebaseToken, translationCtrl.update);
router.post("/feedback", verifyFirebaseToken, translationCtrl.getTranslationFeedback);

module.exports = router;
