const express = require("express")
const router = express.Router();
const authControler = require("../controller/auth.controller.js")

router.post("/signup", authControler.register)
router.post("/signin", authControler.login)


module.exports = router;