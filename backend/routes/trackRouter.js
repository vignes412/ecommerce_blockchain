const express = require("express");
const {
  newTrack,
  getSingleTrack,
  myTracks,
  getAllTracks,
  updateTrack,
  deleteTrack,
} = require("../controllers/trackController");
const router = express.Router();

const { isAuth, isrole } = require("../middleware/auth");

router.route("/Track/new").post(isAuth, newTrack);

router.route("/Track/:id").get(isAuth, getSingleTrack);
router.route("/Track/:id").put(isAuth, updateTrack);

module.exports=router;