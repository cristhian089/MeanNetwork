const bcrypt = require("bcrypt");
const User = require("../models/user");

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete data");

  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(400).send("The user is already registered");

  let hash = await bcrypt.hash(req.body.password, 10);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    dbStatus: true,
  });

  let result = await user.save();
  if (!result) return res.status(400).send("Failed to register user");

  try {
    let jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Token generation failed");
  }
};

const listUser = async (req, res) => {
  let users = await User.find({ name: new RegExp(req.params["name"], "i") });

  if (!users || users.length === 0) return res.status("no search results");

  return res.status(200).send({ users });
};

const updateUser = async () => {};

const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Wrong email or password");

  if (!user.dbStatus) return res.status(400).send("Wrong email or password");

  let hash = await bcrypt.compare(req.body.password, user.password);
  if (!hash) return res.status(400).send("Wrong email or password");

  try {
    let jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Login error");
  }
};

const deleteUser = async () => {};

module.exports = { registerUser, listUser, updateUser, login, deleteUser };
