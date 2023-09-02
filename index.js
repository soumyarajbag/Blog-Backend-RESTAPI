
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/userRoutes.js");
const cors = require("cors");
const blogRouter = require("./routes/blogRoutes.js");




const app = express();
app.use(express.json());
app.use("/user", router);
app.use("/blog", blogRouter);

app.use(cors({
  origin : "*" ,
}));
app.use("/", (req, res) => {
  res.send("Hello World");
});


const mongooseUri = process.env.MONGO_URI; 

mongoose
  .connect(mongooseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Your Server is running");
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });


