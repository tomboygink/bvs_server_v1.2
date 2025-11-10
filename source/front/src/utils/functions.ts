import { IQuery } from "@src/types/IQuery";
import { ECOMMAND } from "@src/types/ECommand";
import { ILocation } from "@src/types/ILocation";
import { IOrg } from "@src/types/IOrg";

type TArgs = {
  [key: string]: string | number | boolean;
};
export const createBodyQuery = (command: ECOMMAND, args: TArgs | TArgs[]) => {
  const code = localStorage.getItem("code");
  const query: IQuery = {
    cmd: command,
    sess_code: code ? JSON.parse(code) : "",
    args,
  };

  return query;
};

export const containsText = (text: string, searchText: string) =>
  text?.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
export const getDigitalStr = (str: string) => {
  return str.replace(/[^\d\.,]/g, "").replace(/,/g, ".");
};

// Options для списка с расположением
export const getLocOptions = (locations: ILocation[]) => {
  let allLocations: any[] = [];
  const recursion = (arr: ILocation[]) => {
    arr.forEach((item) => {
      if (item.subLocations?.length > 0) {
        recursion(item.subLocations);
      }

      allLocations = [
        ...allLocations,
        {
          id: item.id,
          g_name: item.g_name,
          parent_id: item.parent_id,
          org_id: item.org_id,
        },
      ];
    });
    // const groups = arr.reduce((acc, { group: { g_name, id } }) => {
    //   return [...acc, { id, name: g_name }];
    // }, []);
    // setGroup(groups);
  };
  recursion(locations);

  return allLocations.reverse();
};

export function isInnInArray<T extends keyof IOrg>(
  orgs: IOrg[],
  value: string,
  field: T
) {
  return orgs.some((org) => org[field] === value);
}

export const getTextPeriod = (period: string | undefined) => {
  if (period) {
    if (period === "1") {
      return "1 раз в день";
    } else if (period === "7") {
      return "1 раз в 7 дней";
    } else if (period === "14") {
      return "1 раз в 14 дней";
    } else if (period === "31") {
      return "1 раз в 30 (31) дней";
      } else if (period === "144") {
      return "1 раз в 10 мин";
      } else if (period === "24") {
      return "1 раз в 1 час";
      } else if (period === "8") {
      return "1 раз в 3 часа";
      } else if (period === "4") {
      return "1 раз в 6 часов";
    } else return "не установлен";
  }
};
