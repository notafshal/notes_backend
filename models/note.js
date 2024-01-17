const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
console.log("connection to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to Mongo");
  })
  .catch((error) => {
    console.log("error connection to MOngo", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Note", noteSchema);

// // const note = new Note({
// //   content: "HTML is very easy",
// //   important: true,
// // });
// app.get("/api/notes", (req, res) => {
//   Note.find({}).then((note) => {
//     res.json(notes);
//   });
// });
// app.post("api/notes", (req, res) => {
//   const body = req.body;
//   if (body.content === undefined) {
//     return res.status(400).json({ error: "content missing" });
//   }
//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   });
//   note.save().then((result) => {
//     response.save().then((savedNote) => {
//       console.log("note saved");
//       response.json(savedNote);
//     });

//     mongoose.connection.close();
//   });
// });
// app.get("api/notes/:id", (req, res) => {
//   Note.findByID(req.params.id).then((note) => {
//     res.json(note);
//   });
// });
