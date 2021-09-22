const { exec } = require("child_process");
const path = require("path");
const express = require("express");
const expressUploads = require("express-fileupload");
const fs = require("fs");
const getUniqueName = require("./common/shared");

const router = express.Router();
router.use(expressUploads());

router.post("/", (req, res, next) => {
  const fs1 = req.files.file;
  const dirName = process.cwd() + "/uploads";
  const ipFLocation = path.join(dirName, getUniqueName() + fs1.name);
  const outputFilePath = dirName;

  fs1.mv(ipFLocation, (err) => {
    if (err) {
      return next(new Error());
    }

    exec(
      `gs \ -q -dNOPAUSE -dBATCH -dSAFER \ -sDEVICE=pdfwrite \ -dCompatibilityLevel=1.3 \ -dPDFSETTINGS=/ebook \ -dEmbedAllFonts=true \ -dSubsetFonts=true \ -dAutoRotatePages=/None \ -dColorImageDownsampleType=/Bicubic \ -dColorImageResolution=72 \ -dGrayImageDownsampleType=/Bicubic \ -dGrayImageResolution=72 \ -dMonoImageDownsampleType=/Subsample \ -dMonoImageResolution=72 \ -sOutputFile=${inputFile} \ ${inputFile}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }
        res.sendFile(inputFile);
        setTimeout(() => {
          fs.rm(inputFile, (err) => {
            if (!err) console.log("Successfully Deleted");
          });
        }, 5000);
      }
    );
  });
});
