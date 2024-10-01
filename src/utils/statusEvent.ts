import {paletteColor} from '../themes/Utility';
import {formateDate} from './formateDate';

export const statusEvent = (dateRdv: string, status: string) => {
  const nowDate = formateDate(new Date());
  if (dateRdv >= nowDate && status === 'PENDING') {
    return {etat: 'EN ATTENTE', color: '#F2C230'};
  }
  if (dateRdv >= nowDate && status === 'VALIDATED') {
    return {etat: 'ACCEPTE', color: paletteColor.GREEN};
  }
  if (dateRdv < nowDate && status === 'PENDING') {
    return {etat: 'PASSER', color: paletteColor.RED};
  }
  if (dateRdv < nowDate && status === 'VALIDATED') {
    return {etat: 'PASSER', color: paletteColor.GRAY};
  } else {
    return {etat: 'PASSER', color: paletteColor.RED};
  }
};
