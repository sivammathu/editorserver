const express = require("express");
const fs = require("fs");
const path = require("path");
const pdfMerger = require("pdf-merger-js");

const router = express.Router();

// router.post("/", (req, res, err) => {
//   // res.json({ msg: "get request " });
//   const dirName = process.cwd() + "/uploads/72185";
//   res.sendFile(path.join(dirName, "merged.pdf"));
// });

router.post("/", async (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  const dirName = process.cwd() + "/uploads";
  const dstFolder = getUniqueName(dirName);
  const newPath = path.join(dirName, dstFolder);
  fs.mkdir(newPath, async (err) => {
    if (err) return res.json({ msg: "Unable to perform, try later!!", err });
    const merger = new pdfMerger();
    const fs1 = req.files;
    for (let i in fs1) {
      let fs2 = req.files[i];
      await fs2.mv(newPath + "/" + i + ".pdf");
    }
    merger.add(newPath + "/pdf0.pdf", [2]);
    merger.add(newPath + "/pdf1.pdf", [1]); // merge only page 2
    merger.add(newPath + "/pdf0.pdf", [1]);
    await merger.save(path.join(newPath, "merged.pdf"));
    // setTimeout(() => {
    //   fs.rmdir(newPath, (err) => {
    //     if (err) console.error("Error in deleting folder");
    //   });
    // }, 5000);
    // res.json({ msg: "file saved", err });
    setTimeout(() => {
      // res.download(path.join(newPath, "merged.pdf"));
      res.sendFile(path.join(newPath, "merged.pdf"));
    }, 5000);
  });
});

const getUniqueName = (dirName) => {
  const dt = new Date();
  let fName = String(
    dt.getFullYear() +
      dt.getMonth() +
      dt.getDay() +
      dt.getHours() * 3600 +
      dt.getMinutes() * 60 +
      dt.getSeconds()
  );
  while (fs.existsSync(path.join(dirName, fName))) {
    fName++;
  }
  return fName;
};

module.exports = router;
