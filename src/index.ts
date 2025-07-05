import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/mongo";
import rootRouter from "./routes";
import { errorHandler } from "./middleware/errorHandeler";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

//handle cors
const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET,HEAD, PUT,POST,DELETE,PATCH,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());

//localhost:3000

const PORT = process.env.PORT;
app.use("/api", rootRouter);
app.use(errorHandler);

app.get("/", (req: Request, resp: Response) => {
  resp.send("Hello world 4 ");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
});
