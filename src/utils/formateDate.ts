export function formateDate(date: Date) {
  let an = date.getFullYear();
  let jr = date.getDate();
  let mo = date.getMonth() + 1;
  const Days = jr <= 9 ? `0${jr}` : jr;
  const month = mo <= 9 ? `0${mo}` : mo;
  const Years = an <= 9 ? `0${an}` : an;
  let newDate = Days + '-' + month + '-' + Years;
  return newDate;
}
