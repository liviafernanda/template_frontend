import { format, isValid, parseISO, parseJSON } from 'date-fns';
import { diasEntreDatas } from '../../utils/dateUtils';
import moment from 'moment';

const dataHoraGeracao = new Date();

// props = {resultados:, fields:, header:, title:}
export const relatorioCsv = async (props) => {
  const resultado_table = [];
  if (!props.title) {
    props.title = 'Relatório';
  }

  resultado_table.push(props.header);

  props.resultados.forEach((res) => {
    const row = [];
    props.fields.forEach((field) => {
      if (field.type === 'Date') {
        row.push(moment(res[field.name]).format('DD/MM/YYYY'));
      } else if (field.type === 'DateRange') {
        row.push(diasEntreDatas(new Date(res[field.name])));
      } else {
        row.push(res[field.name]);
      }
    });
    resultado_table.push(row);
  });

  const csvContent = resultado_table.map((e) => e.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `${props.title}_${format(dataHoraGeracao, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")}.csv`
  );
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
