import dayjs from 'dayjs';
import 'dayjs/locale/he';

dayjs.locale('he');

export const formatHebrewDate = (date) => {
  return dayjs(date).format('dddd, D בMMMM YYYY');
};
