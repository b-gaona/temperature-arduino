const User = require("./user.mongo");

async function getAllUsers({ skip, limit }) {
  return await User.find(
    {},
    {
      __v: 0,
    }
  )
    .skip(skip) //The number of elements to skip
    .limit(limit); //The number of elements to show
}

async function verifyUser(user) {
  return User.findOne({ nombre: user.nombre, clave: user.clave });
}
async function saveUser(user) {
  return await User.create(user);
}

async function deleteUserById(id) {
  return await User.findByIdAndDelete(id);
}

async function updateUserById(id, user) {
  return await User.findByIdAndUpdate({ _id: id }, user, { new: true });
}

module.exports = {
  getAllUsers,
  saveUser,
  deleteUserById,
  updateUserById,
  verifyUser,
};
