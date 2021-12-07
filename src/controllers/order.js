const PDFDocument = require("pdfkit");

const months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

exports.postOrder = async (req, res, next) => {
  try {
    const data = req.body;

    const doc = new PDFDocument({
      size: "A4",
    });
    const filename = "rozkaz";

    res.setHeader("Content-type", "application/pdf");
    res.setHeader(
      "Content-disposition",
      "inline; filename=" + filename + ".pdf"
    );

    const fontpath = __dirname + "/../fonts/Roboto-Regular.ttf";

    doc.info["Title"] = filename;
    doc.font(fontpath);

    const splitDate = data.orderDate.split("-");
    const year = splitDate[0];
    const month = parseInt(splitDate[1]) - 1;
    const day = splitDate[2];

    doc.fontSize(10).text(`${data.town}, ${day} ${months[month]} ${year} r.`, {
      align: "right",
    });

    doc.pipe(res);
    doc.end();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
