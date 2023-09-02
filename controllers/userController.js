const {User} = require("../models/User.js");
const bcrypt = require("bcryptjs");
 const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  res.status(200).json({ users });
};

 const AddNewUser = async (req, res, next) => {
  let { name, email, password } = req.body;
  console.log(req.body);
  const hashedPass = bcrypt.hashSync(password, 6);
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(404).json({ message: "User Already Exists" });
  }
  const user = new User({
    name,
    email,
    password: hashedPass,
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user, message: "New User Created" });
};

 const LoginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password , existingUser.password);
  if(!isPasswordCorrect){
    return res.status(404).json({ message: "Invalid Password" });
  }
  return res.status(200).json({ message: "Logged In" });
};

module.exports = { getAllUsers, AddNewUser, LoginUser };