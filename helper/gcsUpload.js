"use strict";
const { Storage } = require("@google-cloud/storage");
const moment = require("moment-timezone");
const path = require("path");

const Multer = require("multer");

//save image temp to memory
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // Max size of file (byte), 2 MB
  fileFilter: function (req, file, cb) {
    // check allowed file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const isValidType = allowedTypes.includes(file.mimetype);

    if (isValidType) {
      cb(null, true); // Type file allowed
    } else {
      const error = new Error(
        "Invalid file type. Only jpeg, jpg, and png are allowed."
      );
      // error.status = 400; // set error
      cb(error, false);
    }
  },
});

const multerValidation = (req, res, next) => {
  // Error handler for multer
  try {
    multer.single("image")(req, res, function (err) {
      if (err instanceof Multer.MulterError) {
        // error from multer
        return res.status(400).json({
            data: null,
            message: err.message,
        });
      } else if (err) {
        // Another error
        return res.status(400).json({
          data: null,
          message: err.message,
      });
      }
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: error.message,
  });
  }
};

const pathKey = path.resolve("./serviceaccountkey.json");

//Cloud Storage configuration
const gcs = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: pathKey,
});

//add bucket name
const bucketName = process.env.GCP_BUCKET_NAME;
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return "https://storage.googleapis.com/" + bucketName + "/" + filename;
}

const uploadGcs = (req, res, next) => {
  try {
    const idUser = req.id; //get it user from auth middleware
    //check available image input
    if (!req.file) return next();
    //set name for file image before upload to gcs
    const currentTime = moment().format("YYYYMMDD-HHmmss");
    const randomInt = Math.floor(Math.random() * 100) + 1;
    const gcsFileName = `${idUser}/${currentTime}-${randomInt}`;
    const file = bucket.file(gcsFileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on("error", (err) => {
      req.file.cloudStorageError = err;
      next(err);
    });

    stream.on("finish", () => {
      req.file.cloudStorageObject = gcsFileName;
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsFileName);
      next();
    });

    stream.end(req.file.buffer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: error.message,
  });
  }
};

module.exports = { multerValidation, uploadGcs };
