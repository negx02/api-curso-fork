import express from "express";
import dotenv from "dotenv";
import cookie from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/cors.js";
// Rutas
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";    

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by")
app.use(express.json());    
app.use(cookie());    
app.use(cors(corsOptions));

app.use(authRoutes); // Rutas de autenticación
app.use(userRoutes); // Rutas de usuarios   


app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto: ${PORT}`);
});

 