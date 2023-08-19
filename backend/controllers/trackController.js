const Track = require("../models/trackModel.js");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Track
exports.newTrack = catchAsyncErrors(async (req, res, next) => {
  const {
    orderId,
   location,
    vendor,
    orderStatus,
  } = req.body;

  const track = await Track.create({
    orderId,
    location,
     vendor,
     orderStatus
  });

  res.status(201).json({
    success: true,
    track,
  });
});

// get Single Track
exports.getSingleTrack = catchAsyncErrors(async (req, res, next) => {
  const track = await Track.findOne({orderId:req.params.id});

  if (!Track) {
    return next(new ErrorHander("Track not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    track,
  });
});

// get logged in user  Tracks
exports.myTracks = catchAsyncErrors(async (req, res, next) => {
  const Tracks = await Track.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    Tracks,
  });
});

// get all Tracks -- Admin
exports.getAllTracks = catchAsyncErrors(async (req, res, next) => {
  const tracks = await Track.find();

  res.status(200).json({
    success: true,
    tracks,
  });
});
exports.deleteTrack = catchAsyncErrors(async (req, res, next) => {
    const track = await Track.findById(req.params.id);
  
    if (!Track) {
      return next(new ErrorHander("Track not found with this Id", 404));
    }
  
    await Track.deleteOne();
  
    res.status(200).json({
      success: true,
    });
  });
  exports.updateTrack = catchAsyncErrors(async (req, res, next) => {
    const track = await Track.findOne({orderId:req.params.id});
    const {
     location
    } = req.body;
    track.location.push(location);
    await track.save();

    console.log('Location added to order:', order);
    res.status(200).json({
      success: true,
      track
    });
  });
  
  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }