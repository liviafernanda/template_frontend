import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format, isValid, parseISO, parseJSON } from 'date-fns';
import { diasEntreDatas } from '../../utils/dateUtils';
import moment from 'moment';

const dataHoraGeracao = new Date();

// props = {resultados:, fields:, header:, title:, :search_params}
export const relatorioPdf = async (props) => {
  const doc = new jsPDF({
    orientation: 'landscape', // paisagem
    unit: 'mm',
    format: 'a4'
  });
  const tamanhoDaFonteTabela = 7;
  const tamanhoDaFonteTexto = 9;
  doc.setFontSize(tamanhoDaFonteTexto);

  let x = 10;
  let y = 10;

  if (!props.title) {
    props.title = 'Relatório';
  }

  doc.setFont('helvetica', 'bold');
  doc.text(props.title, x, y);
  y += 10;
  if (props.search_params) {
    doc.setFont('helvetica', 'normal');
    doc.text('Filtros aplicados:', x, y);
    y += 5;
    props.search_params.forEach((param) => {
      doc.text(`${param.label}: ${param.value}`, x, y);
      y += 5;
    });
  }
  y += 10;
  doc.setFont('helvetica', 'normal');

  const resultado_table = [];

  resultado_table.push(props.header);
  props.resultados.forEach((res) => {
    const row = [];
    props.fields.forEach((field) => {
      if (field.type === 'Date') {
        row.push(momment(res[field.name]).format('DD/MM/YYYY') );
      } else if (field.type === 'DateRange') {
        row.push(diasEntreDatas(new Date(res[field.name])));
      } else {
        row.push(res[field.name]);
      }
    });
    resultado_table.push(row);
  });

  doc.autoTable({
    head: [resultado_table[0]],
    body: resultado_table.slice(1),
    margin: { top: 10 },
    startY: y + 10,
    styles: {
      fontSize: tamanhoDaFonteTabela
    }
  });

  function addPageNumbers(doc) {
    const totalPages = doc.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(tamanhoDaFonteTabela);
      doc.text(10, 200, `Gerado: ${format(dataHoraGeracao, "dd/MM/yyyy' 'HH:mm:ss")}`);
      doc.text(265, 200, `Página ${i} de ${totalPages}`);
    }
  }

  addPageNumbers(doc);

  return doc.save(
    props.title + '_' + format(dataHoraGeracao, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX") + '.pdf'
  );
};
