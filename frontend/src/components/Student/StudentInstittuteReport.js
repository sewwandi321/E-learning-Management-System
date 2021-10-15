// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";




const generatePDF = students => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Name", "Email", "Student Class", "Subject","Month","Year"];
  // define an empty array of rows
  const tableRows = [];

 
  students.forEach(students => {
    const studentData = [
      students.name,
      students.email,
      students.Studentclass,
      students.subject,
      students.month,
      students.year,

     
      moment(new Date()).format("DD/MM/YYYY"),
    ];
  
    tableRows.push(studentData);
  });



  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
 
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  
  doc.text("Monthly Student Report", 14, 15);

  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;