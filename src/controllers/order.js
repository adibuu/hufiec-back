const createError = require("../utils/createError");
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

    if (
      !data.orderDate ||
      !data.orderNumber ||
      !data.town ||
      !data.troopsName
    ) {
      createError(
        "Cannot create order pdf without one of this data: date, order number, town, troops name.",
        400
      );
    }

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
    doc.lineGap(3);

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

    let counter = 1;

    //Ordinances and informations
    if (data.ordinances?.length > 0 || data.information?.length > 0) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(`${counter}. Zarządzenia i informacje`, { align: "justify" });

      let subCounter = 1;

      if (data.ordinances?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(`${counter}.${subCounter}. Zarządzenia`, { align: "justify" });

        data.ordinances.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.information?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(`${counter}.${subCounter}. Informacje`, { align: "justify" });

        data.information.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
      }

      counter = counter + 1;
    }

    //Troop
    if (
      data.troopLayoffs?.length > 0 ||
      data.troopAppointment?.length > 0 ||
      data.troopVocation?.length > 0
    ) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(`${counter}. Hufiec`, { align: "justify" });

      let subCounter = 1;

      if (data.troopLayoffs?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(`${counter}.${subCounter}. Zwolnienia w komendzie hufca`, {
            align: "justify",
          });

        data.troopLayoffs.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.troopAppointment?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(`${counter}.${subCounter}. Mianowania w komendzie hufca`, {
            align: "justify",
          });

        data.troopAppointment.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.troopVocation?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(
            `${counter}.${subCounter}. Powołanie i rozwiązanie sztabów, komisji, komend kursów`,
            {
              align: "justify",
            }
          );

        data.troopVocation.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      counter = counter + 1;
    }

    //Clusters, teams
    if (
      data.givingNames?.length > 0 ||
      data.organizationalChanges?.length > 0 ||
      data.dismissalsAndTeamAppointments?.length > 0
    ) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(`${counter}. Gromady, drużyny`, { align: "justify" });

      let subCounter = 1;

      if (data.givingNames?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(`${counter}.${subCounter}. Nadanie imion, nazw, sztandarów`, {
            align: "justify",
          });

        data.givingNames.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.organizationalChanges?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(`${counter}.${subCounter}. Zmiany organizacyjne`, {
            align: "justify",
          });

        data.organizationalChanges.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.dismissalsAndTeamAppointments?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(
            `${counter}.${subCounter}. Zwolnienia i mianowania drużynowych`,
            {
              align: "justify",
            }
          );

        data.dismissalsAndTeamAppointments.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      counter = counter + 1;
    }

    //Circles, clubs
    if (
      data.givingNamesCirclesAndClubs?.length > 0 ||
      data.appointmentCircles?.length > 0 ||
      data.dismissalsAndTeamAppointmentsCircles?.length > 0
    ) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(`${counter}. Kręgi, kluby`, { align: "justify" });

      let subCounter = 1;

      if (data.givingNamesCirclesAndClubs?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(`${counter}.${subCounter}. Nadanie imion, nazw`, {
            align: "justify",
          });

        data.givingNamesCirclesAndClubs.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.appointmentCircles?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(`${counter}.${subCounter}. Powołania i rozwiązania kręgów`, {
            align: "justify",
          });

        data.appointmentCircles.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.dismissalsAndTeamAppointmentsCircles?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(`${counter}.${subCounter}. Zwolnienia i mianowania w kręgach`, {
            align: "justify",
          });

        data.dismissalsAndTeamAppointmentsCircles.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      counter = counter + 1;
    }

    //Team strains
    if (
      data.givingNamesTeamStrains?.length > 0 ||
      data.appointmentTeamStrains?.length > 0 ||
      data.dismissalsAndTeamAppointmentsTeamStrains?.length > 0
    ) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(`${counter}. Szczepy, związki drużyn`, { align: "justify" });

      let subCounter = 1;

      if (data.givingNamesTeamStrains?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(`${counter}.${subCounter}. Nadanie imion, nazw, sztandarów`, {
            align: "justify",
          });

        data.givingNamesTeamStrains.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.appointmentTeamStrains?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(
            `${counter}.${subCounter}. Powołania i rozwiązania szczepów, związków drużyn`,
            {
              align: "justify",
            }
          );

        data.appointmentTeamStrains.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.dismissalsAndTeamAppointmentsTeamStrains?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(
            `${counter}.${subCounter}. Zwolnienia i mianowania w szczepach i związkach drużyn`,
            {
              align: "justify",
            }
          );

        data.dismissalsAndTeamAppointmentsTeamStrains.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      counter = counter + 1;
    }

    //Summer and winter action
    if (data.appoitmentsHALIZ?.length > 0) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(`${counter}. Harcerska Akcja Letnia i Zimowa`, {
          align: "justify",
        });

      let subCounter = 1;

      if (data.appoitmentsHALIZ?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(
            `${counter}.${subCounter}. Zwolnienia i mianowania kadry HALiZ`,
            {
              align: "justify",
            }
          );

        data.appoitmentsHALIZ.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
      }

      counter = counter + 1;
    }

    //Instructor appoitments
    if (
      data.closeGuideAttempt?.length > 0 ||
      data.openGuideAttempt?.length > 0 ||
      data.closeScoutmasterAttempt?.length > 0 ||
      data.openScoutmasterAttempt?.length > 0 ||
      data.instructorReception?.length > 0
    ) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(`${counter}. Mianowania instruktorów`, { align: "justify" });

      let subCounter = 1;

      if (data.closeGuideAttempt?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(
            `${counter}.${subCounter}. Zamknięcia próby na stopień przewodniczki/przewodnika`,
            {
              align: "justify",
            }
          );

        data.closeGuideAttempt.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.openGuideAttempt?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(
            `${counter}.${subCounter}. Otwarcie próby na stopień przewodniczki/przewodnika`,
            {
              align: "justify",
            }
          );

        data.openGuideAttempt.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.closeScoutmasterAttempt?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(
            `${counter}.${subCounter}.  Zamknięcie próby na stopień podharcmistrzyni/podharcmistrzan`,
            {
              align: "justify",
            }
          );

        data.closeScoutmasterAttempt.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.openScoutmasterAttempt?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(
            `${counter}.${subCounter}.  Otwarcie próby na stopień podharcmistrzyni/podharcmistrza`,
            {
              align: "justify",
            }
          );

        data.openScoutmasterAttempt.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.instructorReception?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(`${counter}.${subCounter}.  Przyjęcie w poczet instruktorów`, {
            align: "justify",
          });

        data.instructorReception.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      counter = counter + 1;
    }

    //Pass service
    if (data.passService?.length > 0) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(`${counter}. Zaliczanie służby instruktorskiej`, {
          align: "justify",
        });

      data.passService.map((field, index) => {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Italic.ttf")
          .text(`${counter}.${index + 1}. ${field.content}`, {
            align: "justify",
          });
      });

      doc.moveDown();
      counter = counter + 1;
    }

    //Allocation service
    if (
      data.obtainAllocation?.length > 0 ||
      data.changeAllocation?.length > 0
    ) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(`${counter}. Przydział służbowy`, { align: "justify" });

      let subCounter = 1;

      if (data.obtainAllocation?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(
            `${counter}.${subCounter}. Uzyskanie przydziału służbowego przez członka ZHP`,
            { align: "justify" }
          );

        data.obtainAllocation.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
        subCounter = subCounter + 1;
      }

      if (data.changeAllocation?.length > 0) {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Bold.ttf")
          .text(`${counter}.${subCounter}. Zmiana przydziału służbowego`, {
            align: "justify",
          });

        data.changeAllocation.map((field, index) => {
          doc
            .fontSize(10)
            .font(__dirname + "/../fonts/Roboto-Italic.ttf")
            .text(`${counter}.${subCounter}.${index + 1}. ${field.content}`, {
              align: "justify",
            });
        });

        doc.moveDown();
      }

      counter = counter + 1;
    }

    //Departure instructor
    if (data.departureInstructor?.length > 0) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(
          `${counter}. Wystąpienia instruktorów, skreślenia z listy członków, ustanie członkostwa`,
          {
            align: "justify",
          }
        );

      data.departureInstructor.map((field, index) => {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Italic.ttf")
          .text(`${counter}.${index + 1}. ${field.content}`, {
            align: "justify",
          });
      });

      doc.moveDown();
      counter = counter + 1;
    }

    //Penalties
    if (data.penalties?.length > 0) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(`${counter}. Kary organizacyjne`, {
          align: "justify",
        });

      data.penalties.map((field, index) => {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Italic.ttf")
          .text(`${counter}.${index + 1}. ${field.content}`, {
            align: "justify",
          });
      });

      doc.moveDown();
      counter = counter + 1;
    }

    //Praise
    if (data.praise?.length > 0) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(`${counter}. Pochwały, wyróżnienia, nagrody`, {
          align: "justify",
        });

      data.praise.map((field, index) => {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Italic.ttf")
          .text(`${counter}.${index + 1}. ${field.content}`, {
            align: "justify",
          });
      });

      doc.moveDown();
      counter = counter + 1;
    }

    //Other
    if (data.other?.length > 0) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(`${counter}. Inne`, {
          align: "justify",
        });

      data.other.map((field, index) => {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Italic.ttf")
          .text(`${counter}.${index + 1}. ${field.content}`, {
            align: "justify",
          });
      });

      doc.moveDown();
      counter = counter + 1;
    }

    //Rectification
    if (data.rectification?.length > 0) {
      doc
        .fontSize(10)
        .font(__dirname + "/../fonts/Roboto-Bold.ttf")
        .text(`${counter}. Sprostowania`, {
          align: "justify",
        });

      data.rectification.map((field, index) => {
        doc
          .fontSize(10)
          .font(__dirname + "/../fonts/Roboto-Italic.ttf")
          .text(`${counter}.${index + 1}. ${field.content}`, {
            align: "justify",
          });
      });

      doc.moveDown();
      counter = counter + 1;
    }

    doc.fontSize(10).font(defaultFontPath).text("Czuwaj!", {
      align: "right",
    });
    doc.fontSize(10).font(defaultFontPath).text("........................", {
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
