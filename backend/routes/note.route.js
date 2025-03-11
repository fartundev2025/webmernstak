import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
  searchNote,
  updateNotePinned,
} from "../controller/note.controller.js"

const router = express.Router()

// Route to add a note
router.post("/add", verifyToken, async (req, res, next) => {
  try {
    await addNote(req, res)
  } catch (error) {
    next(error) // Pass any error to the error handler
  }
})

// Route to edit a note
router.post("/edit/:noteId", verifyToken, async (req, res, next) => {
  try {
    await editNote(req, res)
  } catch (error) {
    next(error)
  }
})

// Route to get all notes
router.get("/all", verifyToken, async (req, res, next) => {
  try {
    await getAllNotes(req, res)
  } catch (error) {
    next(error)
  }
})

// Route to delete a note
router.delete("/delete/:noteId", verifyToken, async (req, res, next) => {
  try {
    await deleteNote(req, res)
  } catch (error) {
    next(error)
  }
})

// Route to update pinned status of a note
router.put("/update-note-pinned/:noteId", verifyToken, async (req, res, next) => {
  try {
    await updateNotePinned(req, res)
  } catch (error) {
    next(error)
  }
})

// Route to search notes
router.get("/search", verifyToken, async (req, res, next) => {
  try {
    await searchNote(req, res)
  } catch (error) {
    next(error)
  }
})

export default router
