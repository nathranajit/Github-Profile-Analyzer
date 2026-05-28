import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import githubRoutes from "./routes/github.route.js";
import { swaggerUi, swaggerSpec } from "./docs/swagger.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1/github", githubRoutes);

app.use(errorMiddleware);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
