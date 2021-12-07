const PDFDocument = require("pdfkit");

exports.postOrder = async (req, res, next) => {
  try {
    const data = req.body;

    const doc = new PDFDocument();
    const filename = "rozkaz";

    res.setHeader("Content-type", "application/pdf");
    res.setHeader(
      "Content-disposition",
      "inline; filename=" + filename + ".pdf"
    );

    doc.info["Title"] = filename;

    doc.fontSize(26).text(data.troopsName);

    doc.pipe(res);
    doc.end();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
