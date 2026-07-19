import { jsPDF } from "jspdf";

export const downloadTripPDF = (trip, itinerary, hotels, foods, budget, tips) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text(`Trip to ${trip.destination}`, 20, y);

  y += 15;
  doc.setFontSize(12);
  doc.text(`Budget: ₹${trip.budget}`, 20, y);

  y += 10;
  doc.text(`Days: ${trip.days}`, 20, y);

  y += 10;
  doc.text(`Interest: ${trip.interest}`, 20, y);

  y += 20;
  doc.setFontSize(16);
  doc.text("Day-wise Itinerary", 20, y);

  itinerary.forEach((day) => {
    y += 10;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.text(day.day, 20, y);

    y += 8;

    doc.setFontSize(11);

    const lines = doc.splitTextToSize(day.content, 170);

    doc.text(lines, 20, y);

    y += lines.length * 7;
  });

  const sections = [
    ["Hotels", hotels],
    ["Famous Foods", foods],
    ["Budget Breakdown", budget],
    ["Travel Tips", tips],
  ];

  sections.forEach(([title, items]) => {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    y += 12;
    doc.setFontSize(15);
    doc.text(title, 20, y);

    y += 8;

    doc.setFontSize(11);

    items.forEach((item) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(item, 25, y);
      y += 7;
    });
  });

  doc.save(`${trip.destination}-Trip.pdf`);
};