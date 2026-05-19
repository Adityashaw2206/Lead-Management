import express from "express";
// @ts-ignore: No type declarations for 'cors' in this project
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";

import errorMiddleware from "./middleware/error.middleware";


const app = express();

app.use(cors());
app.use(express.json());


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);


// ERROR MIDDLEWARE
app.use(errorMiddleware);


export default app;