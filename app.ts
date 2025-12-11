import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import logger from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import authRouter from "./routes/api/auth.js";
import { CustomError } from "./helpers/HttpError.js";


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use(cors());

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ["./routes/api/auth.ts", "./swagger/components.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  // const { status = 500, message = "Server error" } = err;
  // // res.status(500).json({ message: err.message })
  // res.status(status).json({ message });

  const status = err.status || 500;
  let message: string;

  if (status === 500) {
      message = "Server error"; 
      console.error("Internal Server Error:", err.message);
  } else {
      message = err.message;
  }

  res.status(status).json({ message });
});

export default app;
