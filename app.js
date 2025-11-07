import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("¡Hola, mundo!").status(200);
});

app.get("/users", (req, res) => {
    res.send("¡Lista de usuarios! GET").status(200);
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

 