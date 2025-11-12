import express from "express";
import pool from "./config/db.js";
import dotenv from "dotenv";
    
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get("/", async (req, res) => {
  const [row] = await pool.query("SELECT NOW() AS result");
  res.send(`¡Hola Mundo! La hora del servidor es: ${row[0].result}`).status(200);
});

app.get("/users", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT name, email FROM users WHERE is_visible = TRUE");
        res.json(rows).status(200);
    } catch (error) {
        console.error(error); 
        res.status(500).json({error: "Error al obtener los usuarios"});
    }
});

app.post("/users", (req, res) => {
    res.send("¡Usuario creado! POST").status(201);
});

app.delete("/users", (req, res) => {
    res.send("¡Usuario eliminado! DELETE").status(200);
});

app.put("/users", (req, res) => {
    res.send("¡Usuario actualizado! PUT").status(200);
});

app.patch("/users", (req, res) => {
    res.send("¡Usuario modificado! PATCH").status(200);
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto: ${PORT} 😻`);
});

 