import React, { useState } from "react";
import { PDFViewer, PDFDownloadLink, Page } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";  // Si decides no usarlo, puedes eliminar esta línea

function App() {
  const [pdf, setPdf] = useState(null);

  const onFileSelect = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const buffer = event.target.result;
        setPdf(buffer);
      } catch (error) {
        console.error("Error al cargar el archivo PDF", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const onSelectionChange = (event) => {
    const selection = window.getSelection().toString();

    if (selection) {
      navigator.clipboard.writeText(selection);
      alert("Texto copiado al portapapeles");
    }
  };

  return (
    <div className="app-container">
      <input type="file" accept="application/pdf" onChange={onFileSelect} />
      <div className="pdf-container">
        {pdf && (
          <PDFViewer>
            <Page width={500} height={500} renderTextLayer={false} pageIndex={0} pdf={pdf} />
          </PDFViewer>
        )}
      </div>
      {pdf && (
        <PDFDownloadLink document={<Page width={500} height={500} renderTextLayer={false} pageIndex={0} pdf={pdf} />} fileName="documento.pdf">
          {({ blob, url, loading, error }) => (loading ? "Cargando documento..." : "Descargar documento")}
        </PDFDownloadLink>
      )}
      <button onClick={() => setPdf(null)} className="clear-button">
        Limpiar
      </button>
    </div>
  );
}

export default App;
