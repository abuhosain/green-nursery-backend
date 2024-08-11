import { Application, Request, Response } from "express";
import express from "express"
import cors from "cors";
import notFound from "./app/middleware/notFound";
const app: Application = express();
import cookieParser from "cookie-parser"
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandlers";

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['https://green-nursery-frontend.vercel.app'], credentials: true }));


// application routes
app.use('/api/', router)

const test = async (req: Request, res: Response) => {
  // Promise.reject()
  const a = "Green nursery server is running";
  res.send(a);
};

app.get("/", test);

// global error handler
app.use(globalErrorHandler)

// not found route
app.use(notFound);

export default app;
