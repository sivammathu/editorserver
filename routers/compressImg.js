const compress_images = require("compress-images");
const express = require("express");
const expressUploads = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const getUniqueName = require("./common/shared");

const router = express.Router();

router.use(expressUploads());

router.post("/", (req, res, next) => {
  const fs1 = req.files.file;
  const dirName = process.cwd() + "/uploads";
  const ipFLocation = path.join(dirName, getUniqueName() + fs1.name);

  fs1.mv(ipFLocation, (err) => {
    if (err) {
      return next(new Error());
    }
    compressImage(
      ipFLocation,
      dirName + "/compressed_",
      (compressedData, error) => {
        if (error) return next(new Error());
        res.sendFile(compressedData.path_out_new);
        // res.json({ msg: compressedData, folderName: __dirname });
        setTimeout(() => {
          fs.rm(ipFLocation, (err) => {
            if (!err) console.log("Successfully Deleted");
          });
          fs.rm(compressedData.path_out_new, (err) => {
            if (!err) console.log("Successfully Deleted");
          });
        }, 5000);
      }
    );
  });
});

const compressImage = (ipFile, opFile, retrnFn) => {
  compress_images(
    ipFile,
    opFile,
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (error, completed, statistic) {
      // console.log("-------------");
      // console.log(error);
      // console.log(completed);
      // console.log(statistic);
      // console.log("calling fn");
      retrnFn(statistic, error);
      // console.log("-------------");
    }
  );
};

module.exports = router;
