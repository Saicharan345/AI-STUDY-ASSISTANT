import jsPDF from "jspdf";

function DownloadPDF({ studyData }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    let y = 20;

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("AI Study Assistant", 20, y);

    y += 10;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      20,
      y
    );

    y += 18;

    // ---------------- FLASHCARDS ----------------
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Flashcards", 20, y);

    y += 10;

    studyData.flashcards.forEach((card, index) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text(`Flashcard ${index + 1}`, 20, y);

      y += 8;

      doc.setFont("helvetica", "normal");

      const question = doc.splitTextToSize(
        `Q: ${card.question}`,
        170
      );

      doc.text(question, 20, y);

      y += question.length * 7;

      const answer = doc.splitTextToSize(
        `A: ${card.answer}`,
        170
      );

      doc.text(answer, 20, y);

      y += answer.length * 7 + 10;
    });

    // ---------------- QUIZ ----------------

    doc.addPage();

    y = 20;

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Quiz", 20, y);

    y += 10;

    studyData.quiz.forEach((question, index) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");

      const q = doc.splitTextToSize(
        `${index + 1}. ${question.question}`,
        170
      );

      doc.text(q, 20, y);

      y += q.length * 7;

      doc.setFont("helvetica", "normal");

      question.options.forEach((option) => {
        const optionText = doc.splitTextToSize(
          `• ${option}`,
          165
        );

        doc.text(optionText, 28, y);

        y += optionText.length * 7;
      });

      doc.setFont("helvetica", "bold");
      doc.text(
        `Correct Answer: ${question.answer}`,
        20,
        y
      );

      y += 14;
    });

    doc.save("AI_Study_Material.pdf");
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
    >
      📄 Download PDF
    </button>
  );
}

export default DownloadPDF;