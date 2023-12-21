import { intlFormat } from 'date-fns';
export const formatDate = (date: string | null) => {
  const result = date
    ? intlFormat(new Date(date), {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';
  return result;
};
export const formatTime = (date: string | null) => {
  const result = date
    ? intlFormat(new Date(date), {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';
  return result;
};
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeFirstLetter = (str: string) => {
  return str?.replace(/\b\w/g, function (f) {
    return f.toUpperCase();
  });
};
