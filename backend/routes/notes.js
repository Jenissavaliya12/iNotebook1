const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// route-1 fetching all notes using GET : /api/notes/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// route-2 adding  notes using POST : /api/notes/addnote
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter valid title").isLength({
      min: 5,
    }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({ title, description, tag, user: req.user.id });

      const saveNote = await note.save();

      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// route-3 update  notes using PUT : /api/notes/updatenote

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find note to be updated and update it

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).send("Some error occured");
  }
});

// route-4 delete  notes using DELETE : /api/notes/deletenote

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find note to be deleted and delete it

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not found");
    }

    //Allow deletion only if user own this note

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error);
    res.status(500).send("Some error occured");
  }
});
module.exports = router;
