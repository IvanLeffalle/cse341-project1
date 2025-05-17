const router = require("express").Router();

router.use("/", require("./swagger.js"));
router.get("/", (req, res) => {
  //#Swagger.tags=["Hello World"]
  res.send("hello world");
});
router.use("/contacts", require("./contacts.js"));

module.exports = router;
