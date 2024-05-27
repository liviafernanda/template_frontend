import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { PictureAsPdf, TableChart } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { format } from 'date-fns';

const GeradorPdfCsv = ({ cabecalho, linhas, textoTopo, preGenerateCallback }) => {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingCsv, setLoadingCsv] = useState(false);
  const [exportarPdf, setExportarPdf] = useState(false);
  const [exportarCsv, setExportarCsv] = useState(false);
  const dataHoraGeracao = new Date();
  const tamanhoDaFonteTabela = 7;

  const addPageNumbers = (doc) => {
    const totalPages = doc.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(tamanhoDaFonteTabela);
      doc.text(10, 200, `Gerado: ${format(dataHoraGeracao, "dd/MM/yyyy' 'HH:mm:ss")}`);
      doc.text(265, 200, `Página ${i} de ${totalPages}`);
    }
  };

  const gerarPdf = async () => {
    setLoadingPdf(true);
    if (preGenerateCallback) {
      await preGenerateCallback();
    }
    setExportarPdf(true);
  };

  const gerarCsv = async () => {
    setLoadingCsv(true);
    if (preGenerateCallback) {
      await preGenerateCallback();
    }
    setExportarCsv(true);
  };

  useEffect(() => {
    if (exportarPdf) {
      const doc = new jsPDF({
        orientation: 'landscape', // paisagem
        unit: 'mm',
        format: 'a4'
      });

      const tamanhoDaFonteTexto = 9;
      doc.setFontSize(tamanhoDaFonteTexto);

      let x = 10;
      let y = 10;

      if (textoTopo) {
        doc.setFont('helvetica', 'normal');
        textoTopo.map((texto) => {
          const linhasDeAgrupamento = doc.splitTextToSize(texto, 265);
          linhasDeAgrupamento.forEach((linha) => {
            doc.text(linha, x, y);
            y += 5;
            x = 15;
          });
          x = 10;
          y += 5;
        });
      }

      doc.autoTable({
        head: [cabecalho],
        body: linhas,
        margin: { top: 10 },
        startY: y,
        styles: {
          fontSize: tamanhoDaFonteTabela
        }
      });

      addPageNumbers(doc);

      doc.save('DocumentExport' + format(dataHoraGeracao, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX") + '.pdf');

      setExportarPdf(false);
    }
    setLoadingPdf(false);
  }, [exportarPdf]);

  useEffect(() => {
    if (exportarCsv) {
      let csv = '';

      if (textoTopo) {
        textoTopo.map((texto) => {
          csv += `${texto}\n`;
        });
        csv += `\n`;
      }

      csv += `${cabecalho.join(';')}\n`;
      linhas.map((linha) => {
        csv += `${linha.join(';')}\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `DocumentExport${format(dataHoraGeracao, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")}.csv`
      );
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setExportarCsv(false);
    }
    setLoadingCsv(false);
  }, [exportarCsv]);

  return (
    <>
      <LoadingButton
        className="me-2"
        size="small"
        onClick={gerarCsv}
        loading={loadingCsv}
        loadingPosition="start"
        startIcon={<TableChart />}
        variant="contained">
        <span style={{ textTransform: 'none' }}>Exportar CSV</span>
      </LoadingButton>
      <LoadingButton
        className="me-2"
        size="small"
        onClick={gerarPdf}
        loading={loadingPdf}
        loadingPosition="start"
        startIcon={<PictureAsPdf />}
        variant="contained">
        <span style={{ textTransform: 'none' }}>Exportar PDF</span>
      </LoadingButton>
      <div id="container-csv" style={{ display: 'none' }}></div>
    </>
  );
};

export default GeradorPdfCsv;
