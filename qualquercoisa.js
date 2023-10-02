const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/meubancodedados").then(() => {
  const modelodeUsuario = mongoose.model(
    "contas",
    new Schema({
      email: String,
      password: String,
    })
  );

  app.get("/lerdados/:email", async (req, res) => {
    const usuarioEncontrado = await modelodeUsuario.findOne({
      email: req.params.email,
    });
    res.json(usuarioEncontrado);
  });

  app.post("/criardados", async (req, res) => {
    const usuarioCriado = await modelodeUsuario.create(req.body);
    res.json(usuarioCriado);
  });

  app.delete("/deletardados", async (req, res) => {
    const usuarioDeletado = await modelodeUsuario.deleteOne(req.body);
    res.json(usuarioDeletado);
  });

  app.put("/atualizardados", async (req, res) => {
    const usuarioAtualizado = await modelodeUsuario.findOneAndUpdate(
      { email: req.body.oldemail, password: req.body.oldpassword },
      { email, password },
      { returnDocument: "after" }
    );
    res.json(usuarioAtualizado);
  });

  app.listen(3000);
});
