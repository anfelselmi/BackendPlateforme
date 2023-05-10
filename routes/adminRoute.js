const AdminController = require("../controllers/adminController");
const route = require("express").Router();
const passport = require("passport");
if (process.env.ENVIRONMENT === "development") {
route.post("/register", AdminController.register);}
route.get("/",passport.authenticate("jwt", { session: false }),AdminController.getAll);
route.get("/getById/:id",passport.authenticate("jwt", { session: false }),AdminController.getById);
route.put("/update/:id",passport.authenticate("jwt", { session: false }),AdminController.update);
route.delete("/delete/:id",passport.authenticate("jwt", { session: false }),AdminController.delete);

module.exports = route;
