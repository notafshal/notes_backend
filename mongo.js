const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const password = process.argv[2];
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
model.expors = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "HTML is very easy",
//   important: true,
// });
// app.get("/api/notes", (req, res) => {
//   Note.find({}).then((note) => {
//     res.json(notes);
//   });
// });

// note.save().then((result) => {
//   console.log("note saved");
//   mongoose.connection.close();
// });
