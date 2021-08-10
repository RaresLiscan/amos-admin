//TODO: adaptare generator la datele din PHP
import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import antet from '../img/antet.png';

const months = [
  "",
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie"
];

// define a generatePDF function that accepts a tickets argument
const generatePDF = (data, projectDataRaw) => {

  // initialize jsPDF
  const doc = new jsPDF('1', 'mm', [297, 210]);
  // const projectData = projectDataRaw.data;
  const projectData = projectDataRaw.data;

  const tableColumn = ["Nr. Crt", "Nume si prenume", "Moseador", "Numar de telefon", "E-mail"];
  

  // // define the columns we want and their titles
  // const tableColumn = ["Nr. Crt", "Activitate", "Proiect", "Data", "Durata"];
  // // define an empty array of rows
  // const tableRows = [];

  // // for each ticket pass all its data into an array
  // let idx = 1;







  let tableRows = [];
  data.map((participant, index) => {
    const activityData = [
      index + 1,
      participant.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      participant.userId === "guest" ? "Nu" : "Da",
      participant.phoneNumber,
      participant.email,
    ];
    tableRows.push(activityData);
  })









  doc.setFont('Times-Roman');
  doc.addImage(antet, "PNG", 70, 2, 155, 15);
  doc.text("Fisa de registru", 110, 45);
  doc.text("Nr. ______/_______", 110, 53);
  doc.text("Proiect: " + projectData.name, 110, 62);
  doc.setFontSize(12);

  doc.text("Înregistrarile pentru acest eveniment au avut loc electronic, prin intemediul platformei AppMoS, disponibila pe domeniul https://moseadori.amosed.ro.", 10, 75);
  doc.text("Coordonatorul proiectului isi asuma raspunderea pentru corectitudinea si autenticitatea informatiilor, luand in considerare prevederile legale cu privire", 10, 80);
  doc.text("la falsul în declaratii", 10, 85);
  doc.autoTable(tableColumn, tableRows, {
    startY: 89,
    styles: {
      overflow: "linebreak",
      columnWidth: 'wrap',
    },
    theme: 'plain',
    headStyles: {
      fillColor: "#000000",
      textColor: 'white',
      fontSize: 12
    },
    columnStyles: {
      text: {
        columnWidth: "wrap",
      },
      0: {
        columnWidth: 30
      },
      1: {
        columnWidth: 75
      },
      2: {
        columnWidth: 30
      },
      3: {
        columnWidth: 60
      },
      4: {
        columnWidth: 75
      },
    }
  })


  let textY = doc.lastAutoTable.finalY + 10;
  doc.text("Toate persoanele mentionate in tabelul de mai sus au fost de acord cu politica de prelucrare a datelor personale, disponibila", 10, textY);
  doc.setTextColor(0, 0, 255);
  doc.textWithLink("aici", 220, textY, {url: "https://www.amosed.ro/wp-content/uploads/2020/11/Gestiunea-Datelor-cu-Caracter-Personal.pdf"});
  doc.setTextColor(0, 0, 0);
  textY += 10;
  doc.setFont(undefined, "bold");
  doc.text(`Coordonatorul proiectului:\n${projectData.organizer}`, 10, textY);

  doc.save(`Fisa_Registru${projectData.name}.pdf`);
  // var string = doc.output('datauristring');
  // var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
  // var x = window.open();
  // x.document.open();
  // x.document.write(embed);
  // x.document.close();
};

export default generatePDF;