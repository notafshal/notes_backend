const express = require("express");
require("dotenv").config();
const app = express();
const Note = require("./modles/note");
let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("---");
  next();
};
app.use(requestLogger);
app.get("/", (req, res) => {
  res.send("<h1>Hello worlssd</h1>");
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});
app.post("api/notes", (req, res) => {
  const note = req.body;
  console.log(note);
  res.json(note);
});
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}`);
});
