const express = require("express");
const router = express.Router();
const translationCtrl = require("../../controllers/api/translations");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.get("/:id", ensureLoggedIn, translationCtrl.getDayTranslations);
router.get("/official/:id", translationCtrl.getOfficialTranslations);
router.post("/", ensureLoggedIn, translationCtrl.create);
router.put("/:id", ensureLoggedIn, translationCtrl.update);
router.post("/feedback", ensureLoggedIn, translationCtrl.getTranslationFeedback);

module.exports = router;
