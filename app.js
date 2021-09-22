const express = require("express");
const cors = require("cors");
const PdfMerger = require("./routers/pdfmerger");
const ImageCompressor = require("./routers/compressImg");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", ImageCompressor);

app.use("/pdfmerger", PdfMerger);
// app.post("/pdfmerger", (req, res, err) => {
//   const fs1 = req.files;
//   for (let i in fs1) {
//     console.log(req.files[i].name);
//   }
//   res.json({ msg: "asfsa" });
// });

app.listen(5000, () => {
  console.log("Server is up and running");
});
