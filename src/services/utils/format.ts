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
  const newStr = str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  return newStr.length > 25 ? `${newStr} ...` : newStr;
};

export const capitalizeFirstLetter = (str: string) => {
  return str?.replace(/\b\w/g, function (f) {
    const newStr = f.toUpperCase();
    return newStr.length > 25 ? `${newStr} ...` : newStr;
  });
};

export const formatQueryString = (str: string) => {
  const newStr = str
    .split('&')
    .map((s) => s.split('='))
    .reduce((obj: any, currArray: any) => {
      const key = currArray[0];
      const value = currArray[1];
      obj[key] = value;
      return obj;
    }, {});
  return newStr;
};
