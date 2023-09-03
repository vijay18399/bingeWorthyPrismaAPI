import express from "express";
import userRouter from "./routes/user";
import contentRouter from "./routes/content";
import seasonRouter from "./routes/season";
import episodeRouter from "./routes/episode";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());


app.use("/user", userRouter);
app.use("/content", contentRouter);
app.use("/season", seasonRouter);
app.use("/episode", episodeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
