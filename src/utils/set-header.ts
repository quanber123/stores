import { capitalize } from './capitalize';

export const setHeader = (title: string) => {
  const newTitle = capitalize(title.split('/')[1]);
  return (document.title = newTitle ? `${newTitle} | CozaStore` : 'CozaStore');
};
