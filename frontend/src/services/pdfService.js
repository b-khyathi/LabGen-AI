import { jsPDF } from "jspdf";

export const downloadPDF = (title, content) => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title || "Lab Manual", pageWidth / 2, 20, {
    align: "center",
  });

  // Body
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const lines = doc.splitTextToSize(content, 180);

  doc.text(lines, 15, 35);

  doc.save(`${title || "Lab_Manual"}.pdf`);
};
