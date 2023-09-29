const bodyParser = require("body-parser");
const express = require("express");
const nanoid = require("nanoid");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Users, UserTasks, Items } = require("./Schema");
mongoose.connect(
  "mongodb+srv://hardik109bkp:G6d9eWbaFC1pQASI@cluster0.e5sh7dv.mongodb.net/"
);

const app = express();
const port = 3000;
app.use(cors());
let items = [];
const userTasks = [];
app.use(bodyParser.json());
const users = [];
const secretKey = "s3cret";

const generateJwt = (user) => {
  const token = jwt.sign({ user }, secretKey);
  return token;
};
const authenticateUser = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  jwt.verify(token, secretKey, (error, email) => {
    if (error) {
      return res.status(403).json({ message: "User authentication failed" });
    }
    req.email = email;
    next();
  });
};
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await Users.findOne({ email: email });
  if (!user) {
    await Users.create({ name: name, email: email, password: password });
    await UserTasks.create({ name: name, email: email });
    return res.status(200).json({ msg: "User created" });
  }
  res.status(403).json({ msg: "User already exist" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExist = await Users.findOne({ email: email});
  console.log(userExist);
  if (userExist && userExist.password===password) {
    const token = generateJwt(email);
    res.status(200).json({ msg: "Success", token, name: userExist.name });
  } else if( userExist && userExist.password!== password) {
    res.status(403).json({ message: "Incorrect Password" });
  }
  else{
    res.status(403).json({ message: "No user found" });
  }
});

app.get("/", authenticateUser, async (req, res) => {
  const userItems = await UserTasks.findOne({ email: req.email.user }).select("items").populate(
    "items"
  );
  res.status(200).json(userItems.items);
});


app.post("/", authenticateUser, async (req, res) => {
  const item = new Items({
    description: req.body.title,
    isDone: false,
  });
  await item.save();
  const userItems = await UserTasks.findOne({ email: req.email.user }).select("items");
  userItems.items.push(item);
  await userItems.save();
  res.status(201).json(item);
});

app.patch("/update/:id", authenticateUser, async (req, res) => {
  const id = req.params.id;
  const item = await Items.findById(id);
  if (item) {
    await Items.findByIdAndUpdate(id,{$set:{isDone:!item.isDone}})
    res.status(200).send("Found and updated");
  } else {
    res.status(404).send("Not found");
  }
});

app.delete("/delete/:id", authenticateUser,async (req, res) => {
  const id = req.params.id;
  const item = await Items.findByIdAndDelete(id);
  if (item) {
    res.status(200).send("Found and deleted");
  } else {
    res.status(404).send("Not found");
  }
});

app.delete("/deleteCompleted", authenticateUser, async (req, res) => {
  const userItems =await UserTasks.findOne({email:req.email.user}).populate("items");
  let itemsToDelete = userItems.items.filter((item) => item.isDone === true);
  console.log(itemsToDelete);
  for(let i=0;i<itemsToDelete.length;i++){
    await Items.deleteOne({_id: itemsToDelete[i]._id});
  }
  res.status(200).send("Completed items cleared!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
