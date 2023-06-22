const {
  getAllUsers,
  saveUser,
  deleteUserById,
  updateUserById,
  verifyUser,
} = require("../../models/user.model");
const { getPagination } = require("../../services/query");

async function httpGetAllUsers(req, res) {
  const { skip, limit } = getPagination(req.query); // To read the body of the GET request we use req.query
  const data = await getAllUsers({ skip, limit });
  return res.status(200).json(data);
}

async function httpAddUser(req, res) {
  try {
    const user = req.body;
    const object = {
      ...user,
      fecha: new Date(),
    };

    console.log(object);
    await saveUser(object);
    return res.status(200).json(object);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ...error,
      message: "Maybe you entered the wrong object properties.",
    });
  }
}

async function httpDeleteUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({
      ...error,
      message: `Sorry, we couldn't handle your request, try it later`,
    });
  }
}

async function httpUpdateUserById(req, res) {
  try {
    const { id } = req.params;
    const user = req.body;
    const object = {
      ...user,
      fecha: new Date(),
    };
    const newUser = await updateUserById(id, object);
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(404).json({
      ...error,
      message: `Sorry, we couldn't handle your request, try it later`,
    });
  }
}

async function httpVerifyUser(req, res) {
  try {
    const user = req.body;
    const flag = await verifyUser(user);
    return res.status(200).json(flag);
  } catch (error) {
    return res.status(404).json({
      ...error,
      message: `Sorry, we couldn't handle your request, try it later`,
    });
  }
}

module.exports = {
  httpGetAllUsers,
  httpAddUser,
  httpDeleteUserById,
  httpUpdateUserById,
  httpVerifyUser,
};
