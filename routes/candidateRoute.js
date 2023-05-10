const ContollerCandidate = require("../controllers/candidateController");
const route = require("express").Router();
const passport = require("passport");
route.post("/register", ContollerCandidate.register);
route.get("/all", ContollerCandidate.getAll);
route.get("/getById/:id", ContollerCandidate.getById);
route.put("/update/:id", ContollerCandidate.updateCondidatById);
route.delete("/delete/:id", ContollerCandidate.deleteCondidatById);
module.exports = route;
