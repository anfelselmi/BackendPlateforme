const CompanyController = require("../controllers/companyController");
const route = require("express").Router();
route.post("/register",CompanyController.register);
route.get( "/all", CompanyController.getAll);
route.get("/getById/:id",CompanyController.getById);
route.put( "/update/:id",CompanyController.update);
route.delete("/delete/:id",  CompanyController.delete);
module.exports = route;
