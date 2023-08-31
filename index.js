import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoutes.js";
import cors from "cors";
import blogRouter from "./routes/blogRoutes.js";
const app = express();
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

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

