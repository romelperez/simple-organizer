import { parse } from 'date-fns';

const parseServerDate = (datestring: string): Date => {
  return parse(datestring, "yyyy-MM-dd'T'HH:mm:ss.SSSSSSxxx", new Date());
};

export { parseServerDate };
