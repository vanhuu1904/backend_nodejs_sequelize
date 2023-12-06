import db from "../models/index";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log("-------------");
    console.log(data);
    console.log("-------------");

    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};
let getCRUD = async (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("post crud from server");
};

let displatGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  console.log(">>>check data: ", JSON.stringify(data));
  return res.render("displayCRUD.ejs", { dataTable: data });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInforById(userId);
    // Check user data not found

    // let userData
    return res.render("editCRUD.ejs", { user: userData });
  } else {
    return res.send("Users not found");
  }
};
let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.updateUserData(data);
  return res.render("displayCRUD.ejs", { dataTable: allUsers });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.send("Delete the user succeed");
  } else {
    return res.send("User not found");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displatGetCRUD: displatGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
