import { CartData } from "../constants/Data";

export const searchData = (search: string, data: any, entity: string) => {
  return search.length === 0
    ? data
    : data.filter((val: any) =>
        val[`${entity}`].toUpperCase().includes(search.toUpperCase()),
      );
};
