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
    const defaultFontPath = __dirname + "/../fonts/Roboto-Regular.ttf";

    const splitDate = data.orderDate.split("-");
    const year = splitDate[0];
    const month = parseInt(splitDate[1]) - 1;
    const day = splitDate[2];

    const filename = `Rozkaz L. ${data.orderNumber}/${year}`;

    res.setHeader("Content-type", "application/pdf");
    res.setHeader(
      "Content-disposition",
      "inline; filename=" + filename + ".pdf"
    );

    const doc = new PDFDocument({
      size: "A4",
      font: defaultFontPath,
    });
    doc.info["Title"] = filename;

    //Date
    doc.fontSize(10).text(`${data.town}, ${day} ${months[month]} ${year} r.`, {
      align: "right",
    });

    //TroopName
    doc.fontSize(10).text(data.troopsName, { align: "left" });

    //Order number
    doc.moveDown();
    doc.moveDown();
    doc
      .fontSize(12)
      .font(__dirname + "/../fonts/Roboto-Bold.ttf")
      .text(`Rozkaz L. ${data.orderNumber}/${year}`, { align: "center" });
    doc.moveDown();
    doc.moveDown();

    //OccasionalAdmission
    if (data.occasionalAdmission) {
      doc
        .fontSize(10)
        .font(defaultFontPath)
        .text(data.occasionalAdmission, { align: "justify" });
      doc.moveDown();
    }

    //OrderExceptions
    if (data.orderExceptions) {
      doc
        .fontSize(10)
        .font(defaultFontPath)
        .text(data.orderExceptions, { align: "justify" });
      doc.moveDown();
    }

    doc.pipe(res);
    doc.end();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
