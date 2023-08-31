import express from "express";
import mongoose, { mongo } from "mongoose";
import router from "./routes/userRoutes.js";
import cors from "cors";
const app = express();

app.use("/", router);

app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://soumyarajbag:bag9102003@cluster0.kqkapur.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  }).then(()=>{
    console.log("Connected to Database");
  }).catch((err)=>{
    console.log(err);
  });
app.use("/api", (req, res, next) => {
  res.send("Hello World");
});

